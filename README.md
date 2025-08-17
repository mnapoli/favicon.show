<div align="center"><a href="https://favicon.show"><strong>favicon.show</strong></a></div>

![![favicon.show](https://favicon.show/favicon.png)](./public/meta-image.png)

Grab the URL of any website's favicon, with smart discovery and caching.

This service provides lightning-fast favicon retrieval from any domain, with support for light/dark themes, custom fallback generation, and aggressive edge caching. Built on Cloudflare Workers with KV storage for metadata and global edge caching.

## Usage

Replace `{domain}` with any website:

```html
<img src="https://favicon.show/github.com" alt="GitHub favicon">
<img src="https://favicon.show/google.com" alt="Google favicon">
<img src="https://favicon.show/stackoverflow.com" alt="Stack Overflow favicon">
```

## Options Reference

### Favicon Retrieval

```
https://favicon.show/{domain}
```

Returns the favicon for any domain with automatic discovery and fallbacks.

**Parameters:**
- `{domain}`: Domain name (`github.com`) or full URL (`https://blog.example.com/path`)
- `?theme=auto|light|dark`: Theme preference (default: `auto`)
- `?fallback=default|letter`: Fallback type when no favicon found (default: `letter`)
- `?letter=X`: Force a specific letter instead of discovery
- `?color=RRGGBB`: Custom background color for letter tiles (hex format without #)

**Examples:**
```html
<!-- Basic usage -->
<img src="https://favicon.show/github.com">

<!-- Dark theme preference -->
<img src="https://favicon.show/stackoverflow.com?theme=dark">

<!-- Force letter with custom color -->
<img src="https://favicon.show/example.com?letter=E&color=FF6B6B">

<!-- Custom fallback color -->
<img src="https://favicon.show/nonexistent-domain.com?color=00FF00">
```

### Letter Favicon Generator

```
https://favicon.show/letter/{character}
```

Generate letter favicons.

**Parameters:**
- `{character}`: Any single character (A-Z, 0-9) - invalid characters become '?'
- `?theme=auto|light|dark`: Theme preference (default: `auto`)
- `?color=RRGGBB`: Custom background color in hex format

**Examples:**
```html
<img src="https://favicon.show/letter/A">
<img src="https://favicon.show/letter/5?theme=dark">
<img src="https://favicon.show/letter/M?color=FF0000">
```
