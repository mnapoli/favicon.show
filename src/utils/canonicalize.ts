import { parse } from 'tldts';
import { CanonicalizedInput } from '../types';

const PRIVATE_IP_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^::1$/,
  /^fe80:/i,
  /^fc00:/i,
  /^fd00:/i,
];

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

function isPrivateIP(host: string): boolean {
  if (host.includes(':')) {
    return PRIVATE_IP_RANGES.some((regex) => regex.test(host));
  }

  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipPattern.test(host)) return false;

  const parts = host.split('.').map(Number);
  if (parts.some((p) => p > 255)) return false;

  return PRIVATE_IP_RANGES.some((regex) => regex.test(host));
}

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

  if (isPrivateIP(host)) {
    throw new Error('Private IP addresses are not allowed');
  }

  if (isBlockedHost(host)) {
    throw new Error('Blocked host');
  }

  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const ipv6Pattern = /^\[?[0-9a-fA-F:]+\]?$/;
  if (ipPattern.test(host) || ipv6Pattern.test(host)) {
    throw new Error('Direct IP addresses are not allowed');
  }

  const parsed = parse(url.href);
  
  if (!parsed.domain) {
    throw new Error('Unable to extract domain');
  }

  const registrable = parsed.domain;

  return {
    host: parsed.hostname || host,
    registrable,
  };
}