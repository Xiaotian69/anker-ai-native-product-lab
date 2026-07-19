import normalizedArtifact from '../../pipeline/runs/2026-07-19/normalized-opportunities.json'
import type { OpportunityCandidate } from '../types'

const presentation: Record<string, Pick<OpportunityCandidate, 'description' | 'scoreBasis'>> = {
  'travel-safe-power': {
    description: '围绕合规可读、状态可见和狭窄空间用电建立差异。',
    scoreBasis: '依据已链接公开资料与待验证命题设置的工作坊假设分，不代表市场研究结论。',
  },
  'large-power-bank': {
    description: '容量与功率明确，但竞争密集，差异主要来自参数。',
    scoreBasis: '依据品牌能力与竞品趋势设置的工作坊假设分，尚未用真实购买数据校准。',
  },
  'dorm-charging-station': {
    description: '场景频繁、能力匹配，但与既有多口充电产品接近。',
    scoreBasis: '依据能力匹配与同质化风险设置的工作坊假设分，不等于宿舍用户调研结果。',
  },
  'sleep-earbuds': {
    description: '痛点可能较强，但舒适度、续航和医学表达约束更高。',
    scoreBasis: '纯粹用于比较评分界面的合成假设分；当前没有链接证据，不能支持机会结论。',
  },
  'home-energy-assistant': {
    description: '长期空间可观，但当前证据、部署条件和验证成本不足。',
    scoreBasis: '仅依据品牌方向设置的合成假设分，缺少家庭能源用户与部署条件证据。',
  },
}

export const opportunityCandidates: OpportunityCandidate[] = normalizedArtifact.finalists.map((record) => {
  const display = presentation[record.id]
  if (!display) throw new Error(`Missing opportunity presentation metadata: ${record.id}`)

  return {
    id: record.id,
    name: record.name,
    description: display.description,
    confidence: record.confidence,
    frequency: record.frequency,
    severity: record.severity,
    trend: record.trend,
    willingness: record.willingness,
    capability: record.capability,
    risk: record.risk,
    evidenceIds: record.evidence_ids,
    baselineType: record.baseline_type as OpportunityCandidate['baselineType'],
    scoreBasis: display.scoreBasis,
  }
})
