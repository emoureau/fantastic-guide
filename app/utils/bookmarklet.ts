export const CLIP_PATH = '/clip'

/**
 * Runs on the news site when the bookmark is clicked. `__ORIGIN__` is
 * replaced with this app's origin. Kept as a string (not a real function)
 * so bundling or coverage instrumentation can't change what ends up in
 * the user's bookmark.
 */
const SOURCE = `(() => {
  const meta = s => document.querySelector(s)?.getAttribute('content')?.trim() || '';
  let ld = {};
  document.querySelectorAll('script[type="application/ld+json"]').forEach(el => {
    try {
      [].concat(JSON.parse(el.textContent))
        .flatMap(o => o['@graph'] || o)
        .forEach(o => { if (o && o.datePublished && !ld.datePublished) ld = o; });
    } catch {}
  });
  const ldAuthor = [].concat(ld.author || []).map(a => a.name || a).join(', ');
  const data = {
    url: document.querySelector('link[rel="canonical"]')?.href || meta('meta[property="og:url"]') || location.href,
    title: (meta('meta[property="og:title"]') || ld.headline || document.title).slice(0, 300),
    site: meta('meta[property="og:site_name"]') || location.hostname,
    author: (meta('meta[name="author"]') || ldAuthor).slice(0, 200),
    publishedAt: meta('meta[property="article:published_time"]') || ld.datePublished || '',
    description: (meta('meta[property="og:description"]') || meta('meta[name="description"]')).slice(0, 500),
    image: meta('meta[property="og:image"]'),
    quote: String(getSelection()).trim().slice(0, 1000),
  };
  window.open('__ORIGIN__${CLIP_PATH}?' + new URLSearchParams(data), 'clip', 'width=640,height=860');
})();`

/** The `javascript:` URL to put in the draggable link's href. */
export function buildBookmarklet(origin: string): string {
  // javascript: URLs are percent-decoded before they run, so encode the
  // whole thing; a raw `%` or `#` in the code would otherwise break it.
  return `javascript:${encodeURIComponent(SOURCE.replace('__ORIGIN__', origin))}`
}
