import { describe, expect, it } from 'vitest'
import { councilMessages } from './council'
import { comparisonRows } from './comparison'
import { competitorRows } from './competitors'
import { evidenceItems } from './evidence'
import { evolutionSteps } from './evolution'
import { opportunityCandidates } from './opportunities'
import { runLedger } from './runLedger'
import { validationHypotheses } from './validation'
import councilTranscript from '../../pipeline/runs/2026-07-19/council-transcript.json'
import decisionLedgerArtifact from '../../pipeline/runs/2026-07-19/decision-ledger.json'
import normalizedArtifact from '../../pipeline/runs/2026-07-19/normalized-opportunities.json'
import runManifest from '../../pipeline/runs/2026-07-19/run-manifest.json'

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

  it('keeps the published 7/3/2 evidence split and explicit evidence roles', () => {
    expect(evidenceItems.filter((item) => item.dataType === 'PUBLIC_SOURCE')).toHaveLength(7)
    expect(evidenceItems.filter((item) => item.dataType === 'INTERVIEW_HYPOTHESIS')).toHaveLength(3)
    expect(evidenceItems.filter((item) => item.dataType === 'SYNTHETIC_DEMO')).toHaveLength(2)
    expect(evidenceItems.find((item) => item.id === 'E-007')?.evidenceRole).toBe('COUNTER_EVIDENCE')
    evidenceItems.forEach((item) => expect(item.evidenceRole).toBeTruthy())
  })

  it('keeps the recorded run pending author confirmation and evidence-linked', () => {
    const evidenceIds = new Set(evidenceItems.map((item) => item.id))

    expect(runLedger.authorReview).toBe('pending_author_confirmation')
    expect(runLedger.funnel).toEqual({ raw: 30, clusters: 10, finalists: 5, workingConcept: 1 })
    runLedger.decisions.flatMap((item) => item.evidenceIds).forEach((id) => {
      expect(evidenceIds.has(id)).toBe(true)
    })
  })

  it('renders the committed run artifacts without content drift', () => {
    expect(councilMessages.map(({ id, role, evidenceIds, message, consequence }) => ({ id, role, evidence_ids: evidenceIds, challenge: message, consequence })))
      .toEqual(councilTranscript.messages)

    expect(runLedger.runId).toBe(runManifest.run_id)
    expect(runLedger.runType).toBe(runManifest.run_type)
    expect(runLedger.model).toBe(runManifest.model)
    expect(runLedger.runDate).toBe(runManifest.run_date)
    expect(runLedger.authorReview).toBe(runManifest.author_review)
    expect(runLedger.replayMode).toBe(runManifest.replay_mode)
    expect(runLedger.decisions.map((decision) => ({
      candidate_id: decision.candidateId,
      decision: decision.decision,
      evidence_ids: decision.evidenceIds,
      accepted_reason: decision.reason,
      rejection_pressure: decision.challenge,
      author_review: decision.authorReview,
    }))).toEqual(decisionLedgerArtifact.decisions)

    expect(opportunityCandidates.map((candidate) => ({
      id: candidate.id,
      evidence_ids: candidate.evidenceIds,
      confidence: candidate.confidence,
      frequency: candidate.frequency,
      severity: candidate.severity,
      trend: candidate.trend,
      willingness: candidate.willingness,
      capability: candidate.capability,
      risk: candidate.risk,
      baseline_type: candidate.baselineType,
    }))).toEqual(normalizedArtifact.finalists.map((candidate) => ({
      id: candidate.id,
      evidence_ids: candidate.evidence_ids,
      confidence: candidate.confidence,
      frequency: candidate.frequency,
      severity: candidate.severity,
      trend: candidate.trend,
      willingness: candidate.willingness,
      capability: candidate.capability,
      risk: candidate.risk,
      baseline_type: candidate.baseline_type,
    })))
  })

  it('sources competitor claims and makes every validation hypothesis falsifiable', () => {
    expect(competitorRows).toHaveLength(6)
    competitorRows.forEach((row) => {
      expect(row.sourceUrl).toBe('https://www.anker.com/products/a1638-10k-45w-power-bank')
      expect(row.accessedAt).toBe('2026-07-19')
    })
    expect(validationHypotheses).toHaveLength(4)
    validationHypotheses.forEach((item) => {
      expect(item.status).toBe('NOT_RUN')
      expect(item.failureDecision.length).toBeGreaterThan(8)
    })
  })

  it('provides five opportunity directions and eight council roles', () => {
    expect(opportunityCandidates).toHaveLength(5)
    expect(new Set(councilMessages.map((message) => message.role)).size).toBe(8)
  })

  it('labels every baseline score as synthetic and explains its basis', () => {
    opportunityCandidates.forEach((candidate) => {
      expect(candidate.baselineType).toBe('SYNTHETIC_DEMO')
      expect(candidate.scoreBasis.length).toBeGreaterThan(10)
    })
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
    expect(serialized).not.toContain('已获得全球航空认证')
    expect(serialized).not.toContain('百分之百安全')
  })
})
