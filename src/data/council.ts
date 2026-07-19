import transcript from '../../pipeline/runs/2026-07-19/council-transcript.json'
import type { CouncilMessage } from '../types'

const presentation: Record<string, Pick<CouncilMessage, 'specialty' | 'stance'>> = {
  'AC-01': { specialty: '证据边界', stance: '发现' },
  'AC-02': { specialty: '同质化扫描', stance: '质疑' },
  'AC-03': { specialty: '概念整合', stance: '决策' },
  'AC-04': { specialty: '情境压力', stance: '质疑' },
  'AC-05': { specialty: '热与功耗', stance: '约束' },
  'AC-06': { specialty: '制造复杂度', stance: '约束' },
  'AC-07': { specialty: '规则与表达', stance: '约束' },
  'AC-08': { specialty: '失败预演', stance: '质疑' },
}

export const councilMessages: CouncilMessage[] = transcript.messages.map((record) => {
  const display = presentation[record.id]
  if (!display) throw new Error(`Missing Council presentation metadata: ${record.id}`)

  return {
    id: record.id,
    role: record.role,
    evidenceIds: record.evidence_ids,
    specialty: display.specialty,
    stance: display.stance,
    message: record.challenge,
    consequence: record.consequence,
  }
})
