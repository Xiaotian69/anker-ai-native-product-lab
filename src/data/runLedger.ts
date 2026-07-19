import type { RunLedger } from '../types'

export const runLedger: RunLedger = {
  runId: 'scope-2026-07-19-01',
  runType: 'RECORDED_CODEX_COLLABORATION',
  model: 'OpenAI Codex（GPT-5 系列；客户端不可见具体服务端快照）',
  runDate: '2026-07-19',
  authorReview: 'pending_author_confirmation',
  replayMode: 'DETERMINISTIC_NO_NETWORK',
  funnel: { raw: 30, clusters: 10, finalists: 5, workingConcept: 1 },
  decisions: [
    {
      candidateId: 'travel-safe-power',
      candidateName: '航旅安全移动电源',
      decision: 'WORKING_CONCEPT_NOT_VALIDATED',
      evidenceIds: ['E-001', 'E-002', 'E-003', 'E-004', 'H-001', 'E-007'],
      reason: '规则判断、状态可见与品牌能力形成了可检验的任务组合。',
      challenge: 'A1638 已覆盖多数基础规格，三项任务差异必须通过对照测试。',
    },
    {
      candidateId: 'large-power-bank',
      candidateName: '普通大容量移动电源',
      decision: 'DEFERRED',
      evidenceIds: ['E-004', 'E-006', 'E-007'],
      reason: '能力匹配，但差异主要来自参数。',
      challenge: '无法说明 AI 工作流发现了新的用户任务。',
    },
    {
      candidateId: 'dorm-charging-station',
      candidateName: '宿舍多口充电站',
      decision: 'DEFERRED',
      evidenceIds: ['E-004', 'E-006'],
      reason: '多设备固定充电任务清楚。',
      challenge: '与现有产品接近，并且缺少宿舍用户样本。',
    },
    {
      candidateId: 'sleep-earbuds',
      candidateName: '睡眠耳机',
      decision: 'REJECTED',
      evidenceIds: [],
      reason: '睡眠舒适可能是高痛任务。',
      challenge: '当前证据库没有睡眠用户或技术边界资料。',
    },
    {
      candidateId: 'home-energy-assistant',
      candidateName: '智能家庭能源助手',
      decision: 'DEFERRED',
      evidenceIds: ['E-005'],
      reason: '符合长期储能方向。',
      challenge: '部署条件、数据接入和用户价值证据不足。',
    },
  ],
}
