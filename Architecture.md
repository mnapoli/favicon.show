1) Goals & scope

----------------

- **API**:

    - `GET /{input}` → returns favicon bytes

    - `GET /{input}.json` → returns discovery/caching metadata (debug only)

- **Input tolerance**: `{input}` can be:

    - a bare domain (`example.com`)

    - a full URL (`https://blog.example.com/path?q=1`)

    - any path after the host is **ignored** for discovery; the service resolves to the **registrable domain (eTLD+1)
      ** (e.g., `blog.example.co.uk` → `example.co.uk`)

- **Output size policy**:

    - **Prefer the largest discovered icon ≤128×128** (raster).

    - If multiple sizes exist, pick the max ≤128.

    - If none are ≤128, pick the **smallest >128**. (No resizing in v1; see §7.3 for optional resizing.)

    - **SVG is acceptable** and served as-is.

- **Theming**:

    - `?theme=auto|light|dark` (default `auto`)

    - If the origin exposes light/dark variants (e.g., `<link ... media="(prefers-color-scheme: dark)">`), select
      accordingly. Otherwise unaffected.

- **Fallbacks**:

    - Default: **letter-tile** SVG (first letter of domain), with light/dark styles.

    - `?fallback=default|letter` (default `letter`)

- **Caching**:

    - Metadata revalidation every **7 days** (configurable).

    - Edge body cache (icon bytes) with long TTL and **stale-while-revalidate**.

    - **No persistent image storage**; only metadata in KV; bytes live in the edge cache.

- **Cost/ops**: Cloudflare Workers + Cache API + KV. Optional: Durable Objects (later) for high-concurrency per-host
  locking.

* * * * *

2) Cloudflare components

------------------------

- **Worker** (TypeScript/JS)

- **KV**: `FAVICON_META` (bind to Worker)

- **Cache API**: `caches.default`

- **(Optional)** Durable Object `HostMutex` for per-host discovery lock (skip in v1)

- **Pages** (optional) for docs landing page

* * * * *

3) Request/response behavior

----------------------------

### 3.1 Route handling

- `GET /{input}` → icon bytes (`200`, `404` on invalid input, `502`/`504` on upstream fail, with fallback if configured)

- `GET /{input}.json` → debug JSON (`200`, `404` on invalid input)

- `GET /health` → `200 text/plain: ok`

### 3.2 Canonicalization

1. **Parse `{input}`**:

    - If it lacks a scheme, assume `https://`.

    - Extract `host` (IDNs → punycode ASCII).

2. **Reject** if:

    - Host is empty, contains whitespace, or non-DNS chars.

    - Private/loopback/link-local literal (e.g., `127.0.0.1`, `::1`, `10.0.0.0/8`, `.local`, `localhost`, `.internal`),
      or raw IP.

3. **Registrable domain**:

    - Compute **eTLD+1** using Public Suffix List (PSL).

        - Example: `a.b.example.co.uk` → `example.co.uk`

    - Use registrable domain for discovery & KV key. (Subdomains are **collapsed** by design.)

### 3.3 Cache lookups (hot path)

1. Build a **cache key** from:

    - registrable domain

    - `theme` (auto/light/dark)

    - `fallback` (default/letter)

2. `caches.default.match(request)`

    - **HIT** → return immediately (add `X-Cache: HIT`).

    - **MISS** → proceed.

### 3.4 Metadata lookup (KV)

- KV key: `meta:{registrableDomain}`

- If **present** and **fresh** (`now - lastChecked < 7 days`):

    - **Revalidate** the icon URL using `If-None-Match` / `If-Modified-Since` if available **in the background** (
      `event.waitUntil`) and serve cached body if available. If edge body was evicted, perform a foreground GET.

- If **stale** or **absent**:

    - Run **discovery** (§4) to obtain a prioritized candidate list and select one (including theme).

    - Fetch chosen icon, cache body, and write metadata to KV.

### 3.5 Headers we set on icon responses

- `Content-Type`: from origin (fallbacks set appropriately)

- `Cache-Control`: `public, max-age=2592000, stale-while-revalidate=86400` (30d + 1d)

- `Access-Control-Allow-Origin`: `*`

- `X-Icon-Source`: the final URL used (or `generated:letter-tile`)

- `X-Cache`: `HIT|MISS|REVALIDATED|FALLBACK`

- `Content-Security-Policy`: `default-src 'none'` for debug JSON; not needed for images

* * * * *

4) Discovery algorithm

----------------------

### 4.1 HTML fetch

- Try `https://{registrableDomain}/` with:

    - `redirects`: up to 5

    - `UA`: browser-like string

    - `timeout`: 3s TTFB, 7s total

    - **Abort** HTML after **512 KB** or closing `</head>`.

    - If HTTPS fails cleanly, attempt `http://` once.

### 4.2 Parse candidates (in priority order)

Using **HTMLRewriter** (streaming) to capture `<link>` in `<head>`:

1. `rel~="apple-touch-icon"` or `apple-touch-icon-precomposed` (often high-quality PNG; usually ≥120)

2. `rel~="icon"`, `rel~="shortcut icon"`, `rel~="alternate icon"`

3. `rel~="mask-icon"` (only consider if `type="image/svg+xml"` or URL ends with `.svg`)

4. Fallback probes (no HTML needed, but try if none above found):

    - `/apple-touch-icon.png`

    - `/apple-touch-icon-precomposed.png`

    - `/favicon.ico`

For each `<link>`:

- Normalize URL to absolute.

- Record `type`, `sizes`, `media`, and `rel`.

- If multiple links share rel, treat each as a candidate.

### 4.3 Theme selection

- If `?theme=auto`:

    - Prefer candidates **without** restrictive `media` first.

    - If origin provides `media="(prefers-color-scheme: dark)"` and **no** generic candidate exists, select per theme
      preference map:

        - `auto` → prefer generic; if none, fall back to light candidate.

- If `?theme=dark`:

    - Prefer candidates matching dark media; else generic; else light.

- If `?theme=light`:

    - Prefer light; else generic; else dark.

*(Note: Most sites don't set themed favicon media. This logic is best-effort.)*

### 4.4 Size selection (raster)

- Parse `sizes` attribute (e.g., `32x32`, `48x48`, `any`):

    - Collect all explicit sizes. If `any`, treat as **∞** (defer to content sniff).

- Ranking:

    1. All raster candidates with size ≤128, pick the **max ≤128**.

    2. Else, choose the **smallest >128**.

    3. Else, if no size info, attempt HEAD/GET to detect pixel size for common assets (`png`, `ico` heuristic) ---
       optional; otherwise treat as unknown and rank below known sizes.

- SVG is always acceptable and preferred if quality appears better (serve as SVG).

### 4.5 Candidate verification

For each candidate by priority:

- Prefer **HEAD**; if origin does not support HEAD correctly, do **GET** with `Range: bytes=0-0` (to validate
  existence/content-type cheaply).

- Accept content types: `image/png`, `image/x-icon`, `image/vnd.microsoft.icon`, `image/svg+xml`, `image/jpeg`,
  `image/webp`.

- On first **200** with acceptable type → **select**.

- If all fail → mark status `none` and proceed to fallback.

* * * * *

5) KV metadata schema

---------------------

**Key**: `meta:{registrableDomain}`\
**Value**:


* * * * *

# Non-functional targets

- **Latency**: warm hits <50 ms P50 at edge.
- **Freshness**: metadata revalidated every 7 days; bytes cached 30 days with SWR.
- **Bundle size**: keep <1 MB (avoid WASM at MVP).
- **Cost**: free/very low at demo traffic (Workers free tier + KV).

* * * * *

# Test matrix (high-value cases)

- Sites with only `/favicon.ico`
- Sites with only `apple-touch-icon` (≥180)
- Sites with multiple `sizes` → pick max ≤128
- SVG favicons
- Themed `media="(prefers-color-scheme: dark)"`
- Redirecting homepages (`/` → `/home`)
- Slow or failing origins (serve stale or fallback)
- Inputs: bare domain, full URL, URL with path/query, IDN (`bücher.de`)
- Malicious inputs: IPs, private hosts, `.local`, punycode tricks
