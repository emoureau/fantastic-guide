export default defineEventHandler(async () => {
  return await useStorage('data').getItem<Clipping[]>('clippings') ?? []
})
