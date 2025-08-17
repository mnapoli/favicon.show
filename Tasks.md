Phase 0 --- Project setup
-----------------------

1. **Repo & tooling**

    - Monorepo or single Worker repo (`pnpm`/`npm`, TypeScript).

    - ESLint + Prettier.

    - Wrangler config (`wrangler.toml`) with KV binding `FAVICON_META`.

2. **Domain**

    - Add `favicons.show` to Cloudflare, orange-cloud.

    - Route `*favicons.show/*` → Worker.

**Deliverables**

- Repo bootstrapped

- `wrangler dev` works with hello world

- DNS + route live

* * * * *

Phase 1 --- Core utilities
------------------------

1. **Input canonicalizer**

    - `canonicalizeInput(input: string): { host: string, registrable: string }`

    - Validates scheme/host, rejects private/IPs, punycode handling.

2. **PSL integration**

    - Add lightweight eTLD+1 library (`tldts` in "browser" build) or bundle PSL data with a helper function.

3. **HTTP fetch helpers**

    - `fetchHtml(url, opts)`, `headOrProbe(url)`, common timeouts, retries (1), user-agent, redirect limits.

4. **KV client**

    - `getMeta(registrable)`, `putMeta(registrable, meta)`

**Acceptance**

- Unit tests for canonicalization and eTLD+1 on tricky inputs.

- Rejection of private IPs and `localhost`.

* * * * *

Phase 2 --- Discovery engine
--------------------------

1. **HTMLRewriter parser**

    - Capture `<link>` in `<head>`, collect candidates with attributes (`rel`, `href`, `sizes`, `type`, `media`).

    - Stop parsing at `</head>` or 512 KB.

2. **Candidate generation**

    - Normalize URLs, de-dup by absolute URL.

    - Add fallback probes (`/apple-touch-icon.png`, `/apple-touch-icon-precomposed.png`, `/favicon.ico`) if empty.

3. **Theme selector**

    - Implement `selectByTheme(candidates, theme)` per §4.3.

4. **Size selector**

    - Implement raster ranking per §4.4; always allow SVG.

5. **Verifier**

    - `verifyCandidate(url)` using HEAD or GET+Range, accept content types listed.

**Acceptance**

- Fixture HTMLs with varied icon sets (apple-touch only, ico only, svg only, themed media) → correct selection.

- Handles redirecting home pages.

* * * * *

Phase 3 --- Response pipeline & caching
-------------------------------------

1. **Cache key builder**

    - Include registrable domain, theme, fallback.

2. **Serve from cache**

    - `caches.default.match(request)` → HIT path.

3. **KV fresh/stale logic**

    - Fresh (<7 days): background revalidate via `event.waitUntil`.

    - Stale/miss: run discovery now.

4. **Fetch & store bytes**

    - GET selected icon, stream to response, set headers, `caches.default.put`.

    - On 304 with missing body → unconditional GET once.

5. **KV write**

    - Save `iconUrl`, `contentType`, `etag`, `lastModified`, `lastChecked`, `status`.

**Acceptance**

- Cold miss → fills KV and cache; subsequent request HIT.

- 304 path validated.

- Origin down but stale cached body exists → still serves.

* * * * *

Phase 4 --- Fallbacks & theming
-----------------------------

1. **Letter-tile SVG generator**

    - `renderLetterTile(registrable, theme): Response`

    - Deterministic color selection; WCAG contrast check.

2. **Default PNG fallback**

    - Inline base64 asset and serve if `?fallback=default`.

3. **Theme param**

    - Parse `?theme=auto|light|dark` and pass into selectors/generator.

**Acceptance**

- With no icons or upstream blocked, returns SVG letter tile 200 with correct headers.

- Theme changes background/foreground appropriately.

* * * * *

Phase 5 --- Debug & health
------------------------

1. **`/{input}.json`**

    - Returns: canonicalized host/registrable, KV metadata, chosen URL, cache status.

    - Redact nothing sensitive (there are no secrets).

2. **`/health`**

    - Always `200 ok`.

**Acceptance**

- `/example.com.json` shows useful fields.

- `/health` returns `ok`.

* * * * *

Phase 6 --- Security & limits
---------------------------

1. **SSRF guard**

    - DNS resolve & IP classification (reject private/link-local).

    - Reject IP literal hosts and `.local`, `.internal`, etc.

2. **Limits in fetch**

    - Enforce timeouts, redirect cap, HTML byte cap.

3. **Rate-limit (optional MVP)**

    - In-memory token bucket keyed by client IP; on overflow → serve fallback or 429.

**Acceptance**

- Requests to `127.0.0.1`, `10.0.0.1`, `example.local` → 403.

- Large HTML pages stop parsing at 512 KB without error.

* * * * *

Phase 7 --- Observability & polish
--------------------------------

1. **Structured logs**

    - Log domain, phase, durations, selection, cache result; sample rate 10--20%.

2. **Headers**

    - Ensure `X-Icon-Source`, `X-Cache`, `Access-Control-Allow-Origin: *`.

    - Strip `Set-Cookie` on proxied responses.

3. **Docs page** (optional)

    - Usage examples, query params.

**Acceptance**

- Logs visible in Workers dashboard; headers present.

* * * * *

Phase 8 --- (Optional) Resizing module
------------------------------------

> Only if strict 128×128 raster output is required later.

1. **Feature flag** `ENABLE_RESIZE`.

2. **Cloudflare Image Resizing** path:

    - Proxy via `fetch(iconUrl, { cf: { image: { width: 128, height: 128, fit: 'cover' }}})`

3. **Fallback**: if unavailable, return original asset.

**Acceptance**

- Raster icons larger than 128 are downscaled when flag enabled.