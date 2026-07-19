import type {
  OpportunityInputs,
  ScoredOpportunity,
} from '../types'

export const clampMetric = (value: number): number => {
  if (!Number.isFinite(value)) return 0
  return Math.min(5, Math.max(0, value))
}

export const calculateOpportunityScore = (
  inputs: OpportunityInputs,
): number => {
  const confidence = clampMetric(inputs.confidence)
  const weightedMetrics =
    0.25 * clampMetric(inputs.frequency) +
    0.25 * clampMetric(inputs.severity) +
    0.15 * clampMetric(inputs.trend) +
    0.15 * clampMetric(inputs.willingness) +
    0.2 * clampMetric(inputs.capability)
  const score = confidence * weightedMetrics - clampMetric(inputs.risk)

  return Math.round((score + Number.EPSILON) * 10) / 10
}

export const rankOpportunities = <T extends ScoredOpportunity>(
  candidates: readonly T[],
): T[] => [...candidates].sort((a, b) => b.score - a.score)
