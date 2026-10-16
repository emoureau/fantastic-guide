import { afterEach, describe, expect, it, vi } from 'vitest'
import { buildBookmarklet } from '../../app/utils/bookmarklet'

function run(bookmarklet: string) {
  const code = decodeURIComponent(bookmarklet.replace(/^javascript:/, ''))
  // eslint-disable-next-line no-new-func
  new Function(code)()
}

function openedParams(open: ReturnType<typeof vi.fn>) {
  const url = new URL(open.mock.calls[0]![0] as string)
  return { url, params: Object.fromEntries(url.searchParams) }
}

describe('buildBookmarklet', () => {
  afterEach(() => {
    document.head.innerHTML = ''
    vi.restoreAllMocks()
  })

  it('is a percent-encoded javascript: URL', () => {
    const href = buildBookmarklet('https://app.example')
    expect(href.startsWith('javascript:')).toBe(true)
    expect(href.slice('javascript:'.length)).not.toMatch(/[\s"%#](?![0-9A-F]{2})/)
  })

  it('opens the clip page with Open Graph metadata', () => {
    document.head.innerHTML = `
      <title>Fallback title</title>
      <link rel="canonical" href="https://news.example/story">
      <meta property="og:title" content="Council passes levy">
      <meta property="og:site_name" content="Northline">
      <meta property="og:description" content="The vote was 5–4 at 100% turnout.">
      <meta property="og:image" content="https://news.example/a.jpg">
      <meta name="author" content="Ana Ruiz">
      <meta property="article:published_time" content="2026-10-01T05:12:00Z">`
    const open = vi.spyOn(window, 'open').mockReturnValue(null)

    run(buildBookmarklet('https://app.example'))

    const { url, params } = openedParams(open)
    expect(url.origin + url.pathname).toBe('https://app.example/clip')
    expect(params).toMatchObject({
      url: 'https://news.example/story',
      title: 'Council passes levy',
      site: 'Northline',
      author: 'Ana Ruiz',
      publishedAt: '2026-10-01T05:12:00Z',
      description: 'The vote was 5–4 at 100% turnout.',
      image: 'https://news.example/a.jpg',
    })
  })

  it('falls back to JSON-LD and document.title', () => {
    document.head.innerHTML = `
      <title>Plain title</title>
      <script type="application/ld+json">
        {"@graph": [{"@type": "WebSite"}, {"@type": "NewsArticle", "datePublished": "2026-09-30", "author": [{"name": "A"}, {"name": "B"}]}]}
      </script>`
    const open = vi.spyOn(window, 'open').mockReturnValue(null)

    run(buildBookmarklet('https://app.example'))

    expect(openedParams(open).params).toMatchObject({
      title: 'Plain title',
      author: 'A, B',
      publishedAt: '2026-09-30',
    })
  })
})
