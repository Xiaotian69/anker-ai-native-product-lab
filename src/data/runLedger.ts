import ledgerArtifact from '../../pipeline/runs/2026-07-19/decision-ledger.json'
import normalizedArtifact from '../../pipeline/runs/2026-07-19/normalized-opportunities.json'
import manifest from '../../pipeline/runs/2026-07-19/run-manifest.json'
import type { RunDecision, RunLedger } from '../types'

const candidateNames = new Map(
  normalizedArtifact.finalists.map((candidate) => [candidate.id, candidate.name]),
)

const decisions: RunDecision[] = ledgerArtifact.decisions.map((record) => {
  const candidateName = candidateNames.get(record.candidate_id)
  if (!candidateName) throw new Error(`Missing finalist for decision: ${record.candidate_id}`)

  return {
    candidateId: record.candidate_id,
    candidateName,
    decision: record.decision as RunDecision['decision'],
    evidenceIds: record.evidence_ids,
    reason: record.accepted_reason,
    challenge: record.rejection_pressure,
    authorReview: record.author_review as RunDecision['authorReview'],
  }
})

export const runLedger: RunLedger = {
  runId: manifest.run_id,
  runType: manifest.run_type as RunLedger['runType'],
  model: manifest.model,
  runDate: manifest.run_date,
  authorReview: manifest.author_review as RunLedger['authorReview'],
  replayMode: manifest.replay_mode as RunLedger['replayMode'],
  funnel: {
    raw: manifest.funnel.raw,
    clusters: manifest.funnel.clusters,
    finalists: manifest.funnel.finalists,
    workingConcept: manifest.funnel.working_concept,
  },
  decisions,
}
