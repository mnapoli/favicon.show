import { parse } from 'tldts';
import { CanonicalizedInput } from '../types';

const BLOCKED_HOSTS = [
  'localhost',
  'localhost.localdomain',
];

const BLOCKED_TLDS = [
  '.local',
  '.internal',
  '.invalid',
  '.test',
  '.example',
  '.localhost',
];

function isBlockedHost(host: string): boolean {
  const lowerHost = host.toLowerCase();
  
  if (BLOCKED_HOSTS.includes(lowerHost)) return true;
  
  if (BLOCKED_TLDS.some((tld) => lowerHost.endsWith(tld))) return true;
  
  return false;
}

export function canonicalizeInput(input: string): CanonicalizedInput {
  let url: URL;
  
  try {
    if (!input.includes('://')) {
      input = `https://${input}`;
    }
    url = new URL(input);
  } catch (error) {
    throw new Error(`Invalid input URL: ${input}`);
  }

  const host = url.hostname.toLowerCase();

  if (!host || host.includes(' ')) {
    throw new Error('Invalid host');
  }

  const parsed = parse(url.href);
  
  if (!parsed.domain) {
    throw new Error('Unable to extract domain');
  }

  const registrable = parsed.domain;

  return {
    host: parsed.hostname || host,
    registrable,
    useFallback: parsed.isIp || isBlockedHost(host),
  };
}