export default defineEventHandler(async (event) => {
  const body = await readBody<Partial<ClippingInput>>(event)

  if (!body?.url || !body.title)
    throw createError({ statusCode: 400, statusMessage: 'url and title are required' })

  const clipping: Clipping = {
    id: crypto.randomUUID(),
    savedAt: new Date().toISOString(),
    url: body.url,
    title: body.title,
    site: body.site ?? '',
    author: body.author ?? '',
    publishedAt: body.publishedAt ?? '',
    description: body.description ?? '',
    image: body.image ?? '',
    quote: body.quote ?? '',
    notes: body.notes ?? '',
    tags: body.tags ?? [],
  }

  const storage = useStorage('data')
  const clippings = await storage.getItem<Clipping[]>('clippings') ?? []
  await storage.setItem('clippings', [clipping, ...clippings])

  return clipping
})
