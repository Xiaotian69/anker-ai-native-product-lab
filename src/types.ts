export type EvidenceType =
  | 'PUBLIC_SOURCE'
  | 'INTERVIEW_HYPOTHESIS'
  | 'SYNTHETIC_DEMO'

export type ConfidenceLevel = '高' | '中' | '待验证'

export interface EvidenceItem {
  id: string
  title: string
  scene: string
  problem: string
  severity: number
  alternative: string
  sourceName: string
  sourceUrl?: string
  accessedAt?: string
  confidence: ConfidenceLevel
  dataType: EvidenceType
  summary: string
  tags: string[]
}

export interface OpportunityInputs {
  confidence: number
  frequency: number
  severity: number
  trend: number
  willingness: number
  capability: number
  risk: number
}

export interface OpportunityCandidate extends OpportunityInputs {
  id: string
  name: string
  description: string
  evidenceIds: string[]
}

export interface ScoredOpportunity {
  id: string
  name: string
  score: number
}

export interface CouncilMessage {
  id: string
  role: string
  specialty: string
  stance: '发现' | '质疑' | '约束' | '决策'
  message: string
  consequence: string
}

export interface EvolutionStep {
  version: string
  concept: string
  issue: string
  evidenceIds: string[]
  decision: string
  status: string
}

export interface ComparisonRow {
  dimension: string
  traditional: string
  aiNative: string
}
