import type { OpportunityCandidate, OpportunityInputs, ScoredOpportunity } from '../types'
import { clampMetric } from './opportunity'

export interface ScenarioWeights {
  frequency: number
  severity: number
  trend: number
  willingness: number
  capability: number
  riskMultiplier: number
}

export interface OpportunityScenario {
  id: 'balanced' | 'safety' | 'commercial'
  name: string
  description: string
  weights: ScenarioWeights
}

export interface ScenarioAnalysis {
  scenario: OpportunityScenario
  ranking: ScoredOpportunity[]
}

export const opportunityScenarios: OpportunityScenario[] = [
  {
    id: 'balanced',
    name: '平衡基线',
    description: '沿用公开公式，均衡看待频率、严重度、趋势、支付与能力。',
    weights: { frequency: 0.25, severity: 0.25, trend: 0.15, willingness: 0.15, capability: 0.2, riskMultiplier: 1 },
  },
  {
    id: 'safety',
    name: '安全优先挑战',
    description: '提高严重度、能力与风险的影响，降低支付意愿的影响。',
    weights: { frequency: 0.15, severity: 0.35, trend: 0.15, willingness: 0.05, capability: 0.3, riskMultiplier: 1.2 },
  },
  {
    id: 'commercial',
    name: '商业优先挑战',
    description: '提高出现频率与支付意愿的影响，并降低风险扣分。',
    weights: { frequency: 0.3, severity: 0.15, trend: 0.1, willingness: 0.25, capability: 0.2, riskMultiplier: 0.8 },
  },
]

export const scoreWithScenario = (
  inputs: OpportunityInputs,
  scenario: OpportunityScenario,
): number => {
  const { weights } = scenario
  const weightedSum =
    weights.frequency * clampMetric(inputs.frequency) +
    weights.severity * clampMetric(inputs.severity) +
    weights.trend * clampMetric(inputs.trend) +
    weights.willingness * clampMetric(inputs.willingness) +
    weights.capability * clampMetric(inputs.capability)
  const score = clampMetric(inputs.confidence) * weightedSum -
    clampMetric(inputs.risk) * weights.riskMultiplier

  return Math.round((score + Number.EPSILON) * 10) / 10
}

export const analyzeSensitivity = (
  candidates: readonly OpportunityCandidate[],
  scenarios: readonly OpportunityScenario[],
): ScenarioAnalysis[] => scenarios.map((scenario) => ({
  scenario,
  ranking: candidates
    .map((candidate) => ({
      id: candidate.id,
      name: candidate.name,
      score: scoreWithScenario(candidate, scenario),
    }))
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id)),
}))

export const rankDelta = (
  candidateId: string,
  from: ScenarioAnalysis,
  to: ScenarioAnalysis,
): number => {
  const fromRank = from.ranking.findIndex((item) => item.id === candidateId)
  const toRank = to.ranking.findIndex((item) => item.id === candidateId)
  if (fromRank < 0 || toRank < 0) return 0
  return fromRank - toRank
}
