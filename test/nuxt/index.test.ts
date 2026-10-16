import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime'
import { describe, expect, it } from 'vitest'
import IndexPage from '../../app/pages/index.vue'

registerEndpoint('/api/clippings', () => [])

describe('index page', () => {
  it('renders a draggable bookmarklet link', async () => {
    const component = await mountSuspended(IndexPage)
    const href = component.get('[data-testid="bookmarklet"]').attributes('href')
    expect(href).toMatch(/^javascript:/)
    expect(component.text()).toContain('Nothing yet')
  })
})
