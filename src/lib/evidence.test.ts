import { describe, expect, it } from 'vitest'
import type { EvidenceItem } from '../types'
import { filterEvidence } from './evidence'

const evidence: EvidenceItem[] = [
  {
    id: 'E-001',
    title: '清晰标注 Wh',
    scene: '航空出行',
    problem: '旅客需要判断移动电源能否携带',
    severity: 5,
    alternative: '临时查询航司规则',
    sourceName: '公开资料',
    sourceUrl: 'https://example.com/rule',
    accessedAt: '2026-07-19',
    confidence: '高',
    dataType: 'PUBLIC_SOURCE',
    summary: '规则以 Wh 为判断单位。',
    tags: ['合规', 'Wh'],
  },
  {
    id: 'E-002',
    title: '线材管理命题',
    scene: '日常通勤',
    problem: '线材可能造成桌面杂乱',
    severity: 3,
    alternative: '自带短线',
    sourceName: '访谈待验证',
    confidence: '待验证',
    dataType: 'INTERVIEW_HYPOTHESIS',
    summary: '需要真实访谈确认。',
    tags: ['线材'],
  },
]

describe('filterEvidence', () => {
  it('searches across titles, problems, summaries, and tags', () => {
    expect(filterEvidence(evidence, { query: '合规' })).toHaveLength(1)
    expect(filterEvidence(evidence, { query: 'WH' })[0].id).toBe('E-001')
  })

  it('combines scene, minimum severity, and confidence filters', () => {
    expect(
      filterEvidence(evidence, {
        scene: '航空出行',
        minSeverity: 4,
        confidence: '高',
      }).map((item) => item.id),
    ).toEqual(['E-001'])
  })

  it('returns all records when filters are empty', () => {
    expect(filterEvidence(evidence, {})).toHaveLength(2)
  })
})
