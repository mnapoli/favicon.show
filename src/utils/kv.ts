import { FaviconMeta } from '../types';

const KV_TTL = 7 * 24 * 60 * 60 * 1000;

export class KVClient {
  constructor(private kv: KVNamespace) {}

  async getMeta(registrable: string): Promise<FaviconMeta | null> {
    const key = `meta:${registrable}`;
    const value = await this.kv.get(key, 'json');
    return value as FaviconMeta | null;
  }

  async putMeta(registrable: string, meta: FaviconMeta): Promise<void> {
    const key = `meta:${registrable}`;
    await this.kv.put(key, JSON.stringify(meta), {
      expirationTtl: Math.floor(KV_TTL / 1000),
    });
  }

  isFresh(meta: FaviconMeta): boolean {
    const now = Date.now();
    const age = now - meta.lastChecked;
    return age < KV_TTL;
  }
}