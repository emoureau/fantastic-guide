import { expect, test } from '@playwright/test'

test('bookmarklet opens a pre-filled form that saves a clipping', async ({ page, context }) => {
  await page.goto('/')
  const bookmarklet = await page.getByTestId('bookmarklet').getAttribute('href')

  // Stand-in for a news site: a page on another origin with article metadata.
  await page.route('https://news.example/**', route => route.fulfill({
    contentType: 'text/html',
    body: `<html><head>
      <title>Fallback</title>
      <meta property="og:title" content="Council passes transit levy">
      <meta property="og:site_name" content="Northline">
      <meta name="author" content="Ana Ruiz">
    </head><body><p>The vote was close.</p></body></html>`,
  }))
  await page.goto('https://news.example/story')
  await page.getByText('The vote was close.').selectText()

  const popupPromise = context.waitForEvent('page')
  await page.evaluate(decodeURIComponent(bookmarklet!.replace(/^javascript:/, '')))
  const popup = await popupPromise

  await expect(popup.getByLabel('Headline')).toHaveValue('Council passes transit levy')
  await expect(popup.getByLabel('URL')).toHaveValue('https://news.example/story')
  await expect(popup.getByLabel('Author')).toHaveValue('Ana Ruiz')
  await expect(popup.getByLabel('Quote')).toHaveValue('The vote was close.')

  await popup.getByRole('button', { name: 'Save clipping' }).click()
  await expect(popup.getByRole('heading', { name: 'Clipping saved' })).toBeVisible()

  await popup.goto('/')
  await expect(popup.getByRole('link', { name: 'Council passes transit levy' }).first()).toBeVisible()
})
