import { describe, expect, it } from 'vitest'
import { assetPath } from './assets'

describe('assetPath', () => {
  it('joins a GitHub Pages base and a public asset without duplicate slashes', () => {
    expect(
      assetPath(
        '/docs/file.pdf',
        '/anker-ai-native-product-lab/',
      ),
    ).toBe('/anker-ai-native-product-lab/docs/file.pdf')
  })

  it('supports the root base used by local preview tools', () => {
    expect(assetPath('docs/file.pdf', '/')).toBe('/docs/file.pdf')
  })
})
