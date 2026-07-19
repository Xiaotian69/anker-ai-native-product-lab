export type EvidenceType =
  | 'PUBLIC_SOURCE'
  | 'INTERVIEW_HYPOTHESIS'
  | 'SYNTHETIC_DEMO'

export type ConfidenceLevel = '高' | '中' | '待验证'

export type EvidenceRole =
  | 'RULE_CONSTRAINT'
  | 'BRAND_CAPABILITY'
  | 'COMPETITOR_EVIDENCE'
  | 'COUNTER_EVIDENCE'
  | 'INTERVIEW_HYPOTHESIS'
  | 'AI_CHALLENGE'

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
  evidenceRole: EvidenceRole
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
  baselineType: 'SYNTHETIC_DEMO'
  scoreBasis: string
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

export interface RunDecision {
  candidateId: string
  candidateName: string
  decision: 'WORKING_CONCEPT_NOT_VALIDATED' | 'DEFERRED' | 'REJECTED'
  evidenceIds: string[]
  reason: string
  challenge: string
}

export interface RunLedger {
  runId: string
  runType: 'RECORDED_CODEX_COLLABORATION'
  model: string
  runDate: string
  authorReview: 'pending_author_confirmation'
  replayMode: 'DETERMINISTIC_NO_NETWORK'
  funnel: {
    raw: number
    clusters: number
    finalists: number
    workingConcept: number
  }
  decisions: RunDecision[]
}

export interface CompetitorRow {
  capability: string
  a1638: string
  aero: string
  proof: string
  status: 'PARITY' | 'PROPOSED_UNVALIDATED'
  sourceUrl: string
  accessedAt: string
}

export interface ValidationHypothesis {
  id: string
  hypothesis: string
  method: string
  threshold: string
  status: 'NOT_RUN'
  failureDecision: string
}
