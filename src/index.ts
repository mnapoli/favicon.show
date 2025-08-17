import { Env, Theme, Fallback, FaviconMeta } from './types';
import { canonicalizeInput } from './utils/canonicalize';
import { KVClient } from './utils/kv';
import { fetchWithTimeout } from './utils/http';
import { discoverIcon } from './discovery';
import { generateLetterTile, generateDefaultFallback, generateGenericLetterTile } from './fallback/letter-tile';

function buildCacheKey(registrable: string, theme: Theme, fallback: Fallback, forcedLetter?: string | null, color?: string | null): Request {
  const url = new URL('https://cache.favicons.show');
  url.pathname = `/${registrable}`;
  url.searchParams.set('theme', theme);
  url.searchParams.set('fallback', fallback);
  url.searchParams.set('v', '2'); // Cache version - increment to bust all caches
  if (forcedLetter) {
    url.searchParams.set('letter', forcedLetter);
  }
  if (color && !forcedLetter) {
    // Only include color in cache key for fallbacks, not forced letters
    url.searchParams.set('color', color);
  }
  return new Request(url.toString());
}

async function fetchAndCacheIcon(
  iconUrl: string,
  cacheKey: Request,
  ctx: ExecutionContext,
  cacheStatus: string
): Promise<Response> {
  const iconResponse = await fetchWithTimeout(iconUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)',
      'Accept': 'image/*',
    },
    timeout: 7000,
  });
  
  if (!iconResponse.ok) {
    throw new Error(`Failed to fetch icon: ${iconResponse.status}`);
  }

  const [body1, body2] = iconResponse.body!.tee();
  
  const headers = new Headers(iconResponse.headers);
  headers.set('Cache-Control', 'public, max-age=2592000, stale-while-revalidate=86400');
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('X-Icon-Source', iconUrl);
  headers.set('X-Cache', cacheStatus);
  
  ctx.waitUntil(
    caches.default.put(cacheKey, new Response(body2, { headers }))
  );
  
  return new Response(body1, { headers });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.slice(1);

    if (path === 'health') {
      return new Response('ok', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    if (!path) {
      return new Response('Favicon Service - https://favicons.show', {
        status: 200,
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    // Handle /letter/{letter} route
    if (path.startsWith('letter/')) {
      const letter = path.slice(7); // Remove 'letter/' prefix
      if (!letter) {
        return new Response('Letter parameter required', { status: 400 });
      }
      
      const theme = (url.searchParams.get('theme') || 'auto') as Theme;
      const color = url.searchParams.get('color') || undefined;
      
      return generateGenericLetterTile(letter, theme, color);
    }

    const isDebug = path.endsWith('.json');
    const input = isDebug ? path.slice(0, -5) : path;
    const theme = (url.searchParams.get('theme') || 'auto') as Theme;
    const fallback = (url.searchParams.get('fallback') || 'letter') as Fallback;
    const forcedLetter = url.searchParams.get('letter');

    let canonicalized;
    try {
      canonicalized = canonicalizeInput(input);
    } catch (error: any) {
      const status = 404;
      if (isDebug) {
        return new Response(
          JSON.stringify({ error: error.message, input }),
          {
            status,
            headers: {
              'Content-Type': 'application/json',
              'Content-Security-Policy': "default-src 'none'",
            },
          }
        );
      }
      return new Response('Not Found', { status });
    }

    // If a letter is forced, skip discovery and generate letter tile directly
    if (forcedLetter) {
      if (isDebug) {
        return new Response(
          JSON.stringify({
            input,
            canonicalized,
            theme,
            fallback,
            forcedLetter,
            message: 'Using forced letter instead of discovery',
          }),
          {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Content-Security-Policy': "default-src 'none'",
              'Access-Control-Allow-Origin': '*',
            },
          }
        );
      }
      
      const color = url.searchParams.get('color') || undefined;
      return generateGenericLetterTile(forcedLetter, theme, color);
    }

    const color = url.searchParams.get('color');
    const cacheKey = buildCacheKey(canonicalized.registrable, theme, fallback, forcedLetter, color);
    
    const cached = await caches.default.match(cacheKey);
    if (cached && !isDebug) {
      const headers = new Headers(cached.headers);
      headers.set('X-Cache', 'HIT');
      return new Response(cached.body, { headers });
    }

    const kvClient = new KVClient(env.FAVICON_META);
    const meta = await kvClient.getMeta(canonicalized.registrable);

    if (isDebug) {
      return new Response(
        JSON.stringify({
          input,
          canonicalized,
          theme,
          fallback,
          forcedLetter,
          color,
          metadata: meta,
          cacheStatus: meta && kvClient.isFresh(meta) ? 'fresh' : 'stale',
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Content-Security-Policy': "default-src 'none'",
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }

    let iconUrl = meta?.iconUrl;
    let needsDiscovery = !meta || !kvClient.isFresh(meta) || !iconUrl;

    if (meta && kvClient.isFresh(meta) && iconUrl) {
      ctx.waitUntil(
        (async () => {
          try {
            const headers: HeadersInit = {
              'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)',
            };
            if (meta.etag) headers['If-None-Match'] = meta.etag;
            if (meta.lastModified) headers['If-Modified-Since'] = meta.lastModified;
            
            const response = await fetchWithTimeout(iconUrl!, { headers, timeout: 3000 });
            
            if (response.status !== 304 && response.ok) {
              await kvClient.putMeta(canonicalized.registrable, {
                ...meta,
                etag: response.headers.get('etag') || undefined,
                lastModified: response.headers.get('last-modified') || undefined,
                lastChecked: Date.now(),
              });
            } else if (response.status === 304) {
              await kvClient.putMeta(canonicalized.registrable, {
                ...meta,
                lastChecked: Date.now(),
              });
            }
          } catch (error) {
            console.error('Background revalidation failed:', error);
          }
        })()
      );
    }

    if (needsDiscovery) {
      const discovered = await discoverIcon(canonicalized.registrable, theme);
      iconUrl = discovered || undefined;
      
      const newMeta: FaviconMeta = iconUrl
        ? {
            iconUrl,
            contentType: 'image/x-icon',
            status: 'found',
            lastChecked: Date.now(),
          }
        : {
            status: 'none',
            lastChecked: Date.now(),
          };
      
      await kvClient.putMeta(canonicalized.registrable, newMeta);
    }

    if (iconUrl) {
      try {
        return await fetchAndCacheIcon(iconUrl, cacheKey, ctx, 'MISS');
      } catch (error) {
        console.error('Failed to fetch icon:', error);
      }
    }

    if (fallback === 'letter') {
      const color = url.searchParams.get('color') || undefined;
      if (color) {
        // Use custom color for fallback letter tile
        const firstLetter = canonicalized.registrable.charAt(0).toUpperCase();
        return generateGenericLetterTile(firstLetter, theme, color);
      } else {
        // Use domain-based color for fallback letter tile
        return generateLetterTile(canonicalized.registrable, theme);
      }
    } else {
      return generateDefaultFallback();
    }
  },
};