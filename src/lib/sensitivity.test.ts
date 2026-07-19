import { describe, expect, it } from 'vitest'
import { opportunityCandidates } from '../data/opportunities'
import type { OpportunityInputs } from '../types'
import {
  analyzeSensitivity,
  opportunityScenarios,
  rankDelta,
  scoreWithScenario,
} from './sensitivity'

const maxInputs: OpportunityInputs = {
  confidence: 5,
  frequency: 5,
  severity: 5,
  trend: 5,
  willingness: 5,
  capability: 5,
  risk: 0,
}

describe('opportunity sensitivity', () => {
  it('preserves the published maximum under the balanced scenario', () => {
    expect(scoreWithScenario(maxInputs, opportunityScenarios[0])).toBe(25)
  })

  it('uses normalized benefit weights in every scenario', () => {
    opportunityScenarios.forEach((scenario) => {
      const { riskMultiplier: _risk, ...weights } = scenario.weights
      const total = Object.values(weights).reduce((sum, value) => sum + value, 0)
      expect(total).toBeCloseTo(1)
    })
  })

  it('returns five stable rankings for each of three scenarios', () => {
    const analysis = analyzeSensitivity(opportunityCandidates, opportunityScenarios)

    expect(analysis).toHaveLength(3)
    analysis.forEach((scenario) => expect(scenario.ranking).toHaveLength(5))
    expect(analysis[0].ranking[0].id).toBe('travel-safe-power')
    expect(rankDelta('travel-safe-power', analysis[0], analysis[1])).toEqual(expect.any(Number))
  })
})
