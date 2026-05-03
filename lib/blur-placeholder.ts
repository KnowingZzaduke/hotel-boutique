// Warm blur placeholders matching the hotel color palette.
// SVG approach — compatible with Next.js Image component blurDataURL.
// btoa is available globally in Node.js 18+ (required by Next.js 14).

const svgWarm = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#FAF6F0"/></svg>';
const svgDeep = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#4A3829"/></svg>';
const svgGold = '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" fill="#8B6F47"/></svg>';

function toBase64(str: string): string {
  if (typeof Buffer !== 'undefined') return Buffer.from(str).toString('base64');
  return btoa(str);
}

/** Warm cream (#FAF6F0) — use for light-background hotel images */
export const BLUR_WARM = `data:image/svg+xml;base64,${toBase64(svgWarm)}`;

/** Colonial deep brown (#4A3829) — use for dark-hero images */
export const BLUR_DEEP = `data:image/svg+xml;base64,${toBase64(svgDeep)}`;

/** Terracotta gold (#8B6F47) — use for room/restaurant images */
export const BLUR_GOLD = `data:image/svg+xml;base64,${toBase64(svgGold)}`;
