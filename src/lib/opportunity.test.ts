import { describe, expect, it } from 'vitest'
import {
  calculateOpportunityScore,
  clampMetric,
  rankOpportunities,
} from './opportunity'

describe('calculateOpportunityScore', () => {
  it('applies confidence, weighted metrics, and risk', () => {
    expect(
      calculateOpportunityScore({
        confidence: 4,
        frequency: 3,
        severity: 5,
        trend: 4,
        willingness: 3,
        capability: 5,
        risk: 1,
      }),
    ).toBe(15.2)
  })

  it('clamps every input to the zero-to-five scale', () => {
    expect(
      calculateOpportunityScore({
        confidence: 8,
        frequency: -2,
        severity: 8,
        trend: 8,
        willingness: 8,
        capability: 8,
        risk: -1,
      }),
    ).toBe(18.8)
  })
})

describe('clampMetric', () => {
  it.each([
    [-1, 0],
    [2.5, 2.5],
    [8, 5],
  ])('maps %s to %s', (input, expected) => {
    expect(clampMetric(input)).toBe(expected)
  })
})

describe('rankOpportunities', () => {
  it('sorts a copy from highest score to lowest score', () => {
    const candidates = [
      { id: 'low', name: '低分', score: 2.1 },
      { id: 'high', name: '高分', score: 12.4 },
    ]

    expect(rankOpportunities(candidates).map((item) => item.id)).toEqual([
      'high',
      'low',
    ])
    expect(candidates[0].id).toBe('low')
  })
})
