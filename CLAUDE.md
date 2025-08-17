# Claude Code Project Rules

This file contains important project rules and best practices learned during development of the favicon service.

## Testing Guidelines

### Always Use Fresh Domains for Testing
- **Never test with previously used domains** - caching will give false results
- **Use unique domain names** for each test (e.g., `never-tested-domain-12345.xyz`)
- **Verify behavior with both existing and nonexistent domains**
- **Test edge cases** like `.local` domains, IP addresses, malformed inputs

### Cache Considerations
- **KV cache**: 7-day TTL for metadata
- **Edge cache**: 30-day TTL with stale-while-revalidate
- **Cache busting**: Increment version number in cache keys (`v=2`, `v=3`, etc.)
- **Fresh deployment**: New Worker versions help invalidate edge cache

## Code Quality

### Keep It Simple
- **Consolidate related functionality** into fewer files
- **Remove unnecessary abstractions** and intermediate layers  
- **Prefer direct implementations** over complex inheritance chains
- **Use clear, descriptive function names**

### TypeScript Best Practices
- **Always run `npm run typecheck`** before deploying
- **Use proper types** from `@cloudflare/workers-types`
- **Handle nullable/undefined values** explicitly
- **Avoid `any` types** unless absolutely necessary

## Architecture Compliance

### Follow the Specification
- **Architecture.md is the source of truth** for requirements
- **Test matrix cases** must be verified
- **Security requirements** are non-negotiable

### Request Flow
1. Input canonicalization and validation
2. Cache lookup (edge cache first)
3. KV metadata check
4. Favicon discovery (if needed)
5. Fallback generation (if discovery fails)
6. Response with proper headers

## Security Rules

### Input Validation
- **Reject private IPs** (127.x.x.x, 10.x.x.x, 192.168.x.x, etc.)
- **Block local domains** (.local, .internal, localhost)
- **Prevent SSRF attacks** with proper DNS filtering
- **Validate URL schemes** (only http/https)

### Resource Limits
- **Timeout requests** appropriately (7s for HTML, 5s for icon verification)
- **Limit HTML parsing** to 512KB or `</head>` tag
- **Abort on slow DNS resolution** to prevent hanging

## Deployment Guidelines

### Pre-deployment Checks
- **Run type checking**: `npm run typecheck`
- **Test with fresh domains** to verify logic
- **Check debug endpoints** for correct metadata
- **Verify fallback behavior** with nonexistent domains

### Cache Management
- **Increment cache version** in `buildCacheKey()` to bust all caches
- **Clean up unused KV namespaces** (like preview environments)
- **Monitor KV usage** and storage costs

## Error Handling

### Graceful Degradation
- **Always provide fallbacks** when favicon discovery fails
- **Log errors** but don't expose internal details to users
- **Return appropriate HTTP status codes** (404 for invalid input, 502 for upstream failures)
- **Handle DNS timeouts** gracefully with reasonable timeouts

### Debug Support
- **Provide `.json` debug endpoints** for troubleshooting
- **Include relevant metadata** (cache status, discovery results, parameter values)
- **Show clear error messages** for invalid inputs
- **Add helpful notes** explaining parameter behavior

## Performance Optimization

### Caching Strategy
- **Cache at multiple layers** (edge cache + KV metadata)
- **Use stale-while-revalidate** for better user experience  
- **Background revalidation** with conditional requests (ETags, Last-Modified)
- **Appropriate TTLs** (30 days for icons, 7 days for metadata)

### Resource Efficiency
- **Minimize KV reads/writes** with proper freshness checks
- **Stream HTML parsing** instead of loading entire content
- **Use HEAD requests** for icon verification when possible
- **Abort expensive operations** early when possible

## Documentation

### Keep README Updated
- **Working examples** with real URLs
- **Clear parameter descriptions** with expected behavior
- **API documentation** for all endpoints
- **Setup instructions** for new deployments

### Code Comments
- **Explain complex logic** especially around priority handling
- **Document security decisions** and validation rules
- **Note performance considerations** and timeout values
- **Reference Architecture.md sections** for requirements

## Monitoring

### Health Checks
- **Provide `/health` endpoint** for service monitoring
- **Monitor error rates** and timeout frequencies
- **Track cache hit rates** for performance optimization
- **Alert on service failures** or unusual behavior patterns