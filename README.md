# Favicon Service

A high-performance favicon discovery and caching service built on Cloudflare Workers.

## Features

- **Smart Discovery**: Automatically discovers favicons from websites using multiple strategies
- **Size Optimization**: Prefers icons ≤128×128 pixels, with intelligent selection
- **Theme Support**: Light/dark mode favicon selection based on media queries
- **Fallback Generation**: Letter-tile SVG generation when no favicon is found
- **Edge Caching**: Leverages Cloudflare's edge network for fast response times
- **Metadata Storage**: KV-based metadata caching with 7-day revalidation

## API

### Get Favicon
```
GET /{input}
```

Returns the favicon bytes for the given input.

**Parameters:**
- `{input}`: Can be a domain (`example.com`) or full URL (`https://blog.example.com/path`)
- `?theme=auto|light|dark`: Theme preference (default: `auto`)
- `?fallback=default|letter`: Fallback type (default: `letter`)

### Debug Endpoint
```
GET /{input}.json
```

Returns discovery metadata and cache status for debugging.

### Health Check
```
GET /health
```

Returns `ok` if the service is healthy.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a KV namespace in Cloudflare:
```bash
wrangler kv:namespace create "FAVICON_META"
wrangler kv:namespace create "FAVICON_META" --preview
```

3. Update `wrangler.toml` with your KV namespace IDs

4. Run locally:
```bash
npm run dev
```

5. Deploy to Cloudflare:
```bash
npm run deploy
```

## Configuration

Edit `wrangler.toml` to configure:
- KV namespace bindings
- Routes and domains
- Environment-specific settings

## Development

```bash
npm run dev        # Start local development server
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
npm run typecheck  # Check TypeScript types
npm run deploy     # Deploy to Cloudflare
```

## Architecture

The service follows a multi-phase processing pipeline:

1. **Input Canonicalization**: Validates and normalizes input URLs
2. **Cache Lookup**: Checks edge cache for existing favicon
3. **Metadata Check**: Queries KV for stored favicon metadata
4. **Discovery**: If needed, fetches and parses HTML to find favicon candidates
5. **Selection**: Chooses best icon based on size, theme, and priority
6. **Response**: Returns icon with appropriate caching headers

## Security

- Rejects private IPs and localhost domains
- Blocks `.local`, `.internal`, and other non-public TLDs
- Enforces timeouts and size limits on HTML parsing
- Strips sensitive headers from upstream responses