export interface ClippingInput {
  url: string
  title: string
  site: string
  author: string
  publishedAt: string
  description: string
  image: string
  quote: string
  notes: string
  tags: string[]
}

export interface Clipping extends ClippingInput {
  id: string
  savedAt: string
}
