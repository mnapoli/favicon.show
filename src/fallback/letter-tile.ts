import { Theme } from '../types';

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

function getColorForDomain(domain: string): { bg: string; fg: string } {
  const colors = [
    { bg: '#FF6B6B', fg: '#FFFFFF' },
    { bg: '#4ECDC4', fg: '#FFFFFF' },
    { bg: '#45B7D1', fg: '#FFFFFF' },
    { bg: '#96CEB4', fg: '#FFFFFF' },
    { bg: '#FECA57', fg: '#2C3E50' },
    { bg: '#48C9B0', fg: '#FFFFFF' },
    { bg: '#A29BFE', fg: '#FFFFFF' },
    { bg: '#FD79A8', fg: '#FFFFFF' },
    { bg: '#636E72', fg: '#FFFFFF' },
    { bg: '#00B894', fg: '#FFFFFF' },
  ];

  const index = hashCode(domain) % colors.length;
  return colors[index];
}

function getFirstLetter(domain: string): string {
  const cleanDomain = domain.replace(/^www\./, '');
  const firstChar = cleanDomain.charAt(0).toUpperCase();
  
  if (/[A-Z0-9]/.test(firstChar)) {
    return firstChar;
  }
  
  return '?';
}

export function generateLetterTile(registrableDomain: string, theme: Theme): Response {
  const letter = getFirstLetter(registrableDomain);
  const colors = getColorForDomain(registrableDomain);
  
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#2C3E50' : colors.bg;
  const fgColor = isDark ? '#FFFFFF' : colors.fg;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <style>
    @media (prefers-color-scheme: dark) {
      .tile-bg { fill: #2C3E50; }
      .tile-text { fill: #FFFFFF; }
    }
  </style>
  <rect class="tile-bg" width="128" height="128" rx="16" fill="${bgColor}"/>
  <text class="tile-text" x="64" y="64" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" 
        font-size="56" font-weight="600" text-anchor="middle" 
        dominant-baseline="central" fill="${fgColor}">${letter}</text>
</svg>`;

  return new Response(svg, {
    status: 200,
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Icon-Source': 'generated:letter-tile',
      'X-Cache': 'FALLBACK',
    },
  });
}

const DEFAULT_FALLBACK_PNG = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
  'B3RJTUUH5QgBFCQrVzqGgQAAAJZJREFUOMvtkjEOgkAQRd9bWGiMhYmVlZWVB/EAegUPoFfwAHoF' +
  'D6CV1pZaWJhYSIydBYnsArvgJpPMZDLz8/+fgYQsy8Rms5EoijSyJEmYz+dMJhOKoqAsS8IwZLVa' +
  'jQO4rst+v6csS4qioK5r2rbFGIPneQwGAzqdDlVVcTgc6Pf7WJbF5XLh+Xx+Atxut1iWhW3b3w/8' +
  'MG8hL7VJexB8AAAAAElFTkSuQmCC';

export function generateDefaultFallback(): Response {
  const binaryString = atob(DEFAULT_FALLBACK_PNG);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  
  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=2592000, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Icon-Source': 'generated:default',
      'X-Cache': 'FALLBACK',
    },
  });
}