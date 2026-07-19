import { describe, expect, it } from 'vitest'
import { councilMessages } from './council'
import { comparisonRows } from './comparison'
import { evidenceItems } from './evidence'
import { evolutionSteps } from './evolution'
import { opportunityCandidates } from './opportunities'

describe('research data integrity', () => {
  it('keeps every public-source record traceable to a dated URL', () => {
    const publicItems = evidenceItems.filter(
      (item) => item.dataType === 'PUBLIC_SOURCE',
    )

    expect(publicItems.length).toBeGreaterThanOrEqual(4)
    publicItems.forEach((item) => {
      expect(item.sourceUrl).toMatch(/^https:\/\//)
      expect(item.accessedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    })
  })

  it('labels every non-public item as a hypothesis or synthetic demo', () => {
    const allowed = new Set([
      'PUBLIC_SOURCE',
      'INTERVIEW_HYPOTHESIS',
      'SYNTHETIC_DEMO',
    ])

    evidenceItems.forEach((item) => expect(allowed.has(item.dataType)).toBe(true))
  })

  it('provides five opportunity directions and eight council roles', () => {
    expect(opportunityCandidates).toHaveLength(5)
    expect(new Set(councilMessages.map((message) => message.role)).size).toBe(8)
  })

  it('does not contain unsupported absolute-safety marketing', () => {
    const serialized = JSON.stringify({
      evidenceItems,
      opportunityCandidates,
      councilMessages,
      evolutionSteps,
      comparisonRows,
    })

    expect(serialized).not.toContain('绝对不起火')
    expect(serialized).not.toContain('全球航空认证')
    expect(serialized).not.toContain('百分之百安全')
  })
})
