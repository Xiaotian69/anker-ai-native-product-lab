import type { ComparisonRow } from '../types'

export const comparisonRows: ComparisonRow[] = [
  {
    dimension: '用户研究',
    traditional: '少量访谈与高频投诉，样本处理受人力限制。',
    aiNative: '规模化整理公开证据，再用真实访谈校准关键假设。',
  },
  {
    dimension: '洞察形成',
    traditional: '依赖产品经理归纳，推理路径常留在个人经验中。',
    aiNative: '证据卡、置信度与需求图谱保留每一步出处。',
  },
  {
    dimension: '用户画像',
    traditional: '单一典型画像容易抹平极端场景。',
    aiNative: '多角色代理并行挑战，但明确不替代真实用户。',
  },
  {
    dimension: '创意生成',
    traditional: '会议与个人灵感驱动，搜索空间较窄。',
    aiNative: '批量生成、组合和淘汰，并记录被否定的理由。',
  },
  {
    dimension: '工程可行性',
    traditional: '概念成形后再移交工程，返工集中在后期。',
    aiNative: '工程、供应链和合规约束从概念阶段并行介入。',
  },
  {
    dimension: '决策记录',
    traditional: '结论可见，但证据与权衡不一定可追溯。',
    aiNative: '功能映射证据，版本映射验证结果。',
  },
  {
    dimension: '失败处理',
    traditional: '上市或打样后暴露风险，纠偏成本更高。',
    aiNative: '红队预演提前暴露失败条件并设置验证门。',
  },
  {
    dimension: '人的角色',
    traditional: '人既生成答案，也判断答案。',
    aiNative: '人定义边界、审核证据并承担最终取舍责任。',
  },
]
