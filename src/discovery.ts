import { IconCandidate, Theme } from './types';
import { fetchWithTimeout } from './utils/http';

const ACCEPTABLE_TYPES = new Set([
  'image/png',
  'image/x-icon', 
  'image/vnd.microsoft.icon',
  'image/svg+xml',
  'image/jpeg',
  'image/webp',
]);

class IconCollector {
  candidates: IconCandidate[] = [];
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  element(element: Element) {
    const rel = element.getAttribute('rel')?.toLowerCase() || '';
    const href = element.getAttribute('href');
    
    if (!href) return;

    let priority = 100;
    
    if (rel.includes('apple-touch-icon')) {
      priority = 1;
    } else if (rel.includes('icon')) {
      priority = 2;
    } else if (rel.includes('mask-icon')) {
      const type = element.getAttribute('type');
      if (type === 'image/svg+xml' || href.endsWith('.svg')) {
        priority = 3;
      } else {
        return;
      }
    } else {
      return;
    }

    this.candidates.push({
      url: this.normalizeUrl(href),
      rel,
      type: element.getAttribute('type') || undefined,
      sizes: element.getAttribute('sizes') || undefined,
      media: element.getAttribute('media') || undefined,
      priority,
    });
  }

  private normalizeUrl(href: string): string {
    try {
      return new URL(href, this.baseUrl).href;
    } catch {
      return '';
    }
  }
}

export async function discoverIcon(
  registrableDomain: string,
  theme: Theme
): Promise<string | null> {
  const baseUrl = `https://${registrableDomain}`;
  
  let candidates: IconCandidate[] = [];
  
  try {
    const response = await fetchWithTimeout(baseUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)',
        'Accept': 'text/html,application/xhtml+xml',
      },
      timeout: 7000,
    });

    if (response.ok) {
      candidates = await parseHtml(response, baseUrl);
    } else {
      const httpResponse = await fetchWithTimeout(`http://${registrableDomain}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)',
          'Accept': 'text/html,application/xhtml+xml',
        },
        timeout: 7000,
      });
      
      if (httpResponse.ok) {
        candidates = await parseHtml(httpResponse, `http://${registrableDomain}`);
      }
    }
  } catch (error) {
    console.error('Failed to fetch HTML:', error);
  }

  if (candidates.length === 0) {
    candidates = getFallbackCandidates(baseUrl);
  }

  candidates = filterByTheme(candidates, theme);
  candidates = sortByPriorityAndSize(candidates);

  for (const candidate of candidates) {
    if (await verifyCandidate(candidate.url)) {
      return candidate.url;
    }
  }
  return null;
}

async function parseHtml(response: Response, baseUrl: string): Promise<IconCandidate[]> {
  const collector = new IconCollector(baseUrl);
  
  const rewriter = new HTMLRewriter()
    .on('link', {
      element(element: Element) {
        collector.element(element);
      }
    });

  const transformed = rewriter.transform(response);
  await transformed.text();
  
  return collector.candidates;
}

function getFallbackCandidates(baseUrl: string): IconCandidate[] {
  const origin = new URL(baseUrl).origin;
  return [
    {
      url: `${origin}/apple-touch-icon.png`,
      rel: 'apple-touch-icon',
      priority: 4,
    },
    {
      url: `${origin}/apple-touch-icon-precomposed.png`,
      rel: 'apple-touch-icon-precomposed',
      priority: 5,
    },
    {
      url: `${origin}/favicon.ico`,
      rel: 'icon',
      type: 'image/x-icon',
      priority: 6,
    },
  ];
}

function filterByTheme(candidates: IconCandidate[], theme: Theme): IconCandidate[] {
  const generic = candidates.filter(c => !c.media);
  const light = candidates.filter(c => c.media?.includes('light'));
  const dark = candidates.filter(c => c.media?.includes('dark'));

  switch (theme) {
    case 'dark':
      return [...dark, ...generic, ...light];
    case 'light':
      return [...light, ...generic, ...dark];
    default:
      return [...generic, ...light, ...dark];
  }
}

function sortByPriorityAndSize(candidates: IconCandidate[]): IconCandidate[] {
  return candidates.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    
    const aSize = parseMaxSize(a.sizes);
    const bSize = parseMaxSize(b.sizes);
    
    if (aSize <= 128 && bSize <= 128) {
      return bSize - aSize;
    }
    
    if (aSize <= 128) return -1;
    if (bSize <= 128) return 1;
    
    return aSize - bSize;
  });
}

function parseMaxSize(sizes?: string): number {
  if (!sizes) return 0;
  
  if (sizes === 'any') return Infinity;
  
  const matches = sizes.match(/(\d+)x(\d+)/g);
  if (!matches) return 0;
  
  return Math.max(...matches.map(m => {
    const [w, h] = m.split('x').map(Number);
    return Math.max(w, h);
  }));
}

async function verifyCandidate(url: string): Promise<boolean> {
  try {
    // Try HEAD first
    let response = await fetchWithTimeout(url, {
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)',
      },
      timeout: 5000,
    });
    
    // If HEAD fails or returns 405, try GET with Range
    if (!response.ok) {
      response = await fetchWithTimeout(url, {
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FaviconBot/1.0)',
          'Range': 'bytes=0-1023',
        },
        timeout: 5000,
      });
    }
    
    if (!response.ok) {
      return false;
    }
    
    const contentType = response.headers.get('content-type')?.toLowerCase() || '';
    
    // Check content type
    if (ACCEPTABLE_TYPES.has(contentType)) {
      return true;
    }
    
    // Check if any acceptable type is in the content type string
    return Array.from(ACCEPTABLE_TYPES).some(type => contentType.includes(type));
  } catch (error) {
    return false;
  }
}