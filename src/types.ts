export interface Env {
  FAVICON_META: KVNamespace;
}

export interface FaviconMeta {
  iconUrl?: string;
  contentType?: string;
  etag?: string;
  lastModified?: string;
  lastChecked: number;
  status: 'found' | 'none';
  theme?: 'light' | 'dark' | 'auto';
  size?: string;
}

export interface CanonicalizedInput {
  host: string;
  registrable: string;
}

export interface IconCandidate {
  url: string;
  rel: string;
  type?: string;
  sizes?: string;
  media?: string;
  priority: number;
}

export type Theme = 'auto' | 'light' | 'dark';
export type Fallback = 'default' | 'letter';