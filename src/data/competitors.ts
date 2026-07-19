import type { CompetitorRow } from '../types'

const sourceUrl = 'https://www.anker.com/products/a1638-10k-45w-power-bank'

export const competitorRows: CompetitorRow[] = [
  { capability: '容量与输出', a1638: '10,000mAh / 45W', aero: '同规格建议，不主张差异', proof: '作为能力平价项', status: 'PARITY', sourceUrl, accessedAt: '2026-07-19' },
  { capability: '伸缩 USB-C 线', a1638: '已有 2.3 ft 伸缩线', aero: '已有，不构成差异', proof: '不进入创新验证', status: 'PARITY', sourceUrl, accessedAt: '2026-07-19' },
  { capability: '状态显示', a1638: '智能屏显示电池与功率流', aero: '持续显示 Wh 与航旅状态', proof: '规则判断计时与正确率', status: 'PROPOSED_UNVALIDATED', sourceUrl, accessedAt: '2026-07-19' },
  { capability: '温度保护', a1638: 'ActiveShield 内部温度监测', aero: '被动可视温感提示', proof: '温度阈值与盲测理解度', status: 'PROPOSED_UNVALIDATED', sourceUrl, accessedAt: '2026-07-19' },
  { capability: '携带结构', a1638: '日常便携机身', aero: '个人包带固定', proof: '坐姿取用与钩挂任务', status: 'PROPOSED_UNVALIDATED', sourceUrl, accessedAt: '2026-07-19' },
  { capability: '价值主张', a1638: '日常紧凑快充', aero: '航旅规则判断与异常感知', proof: '场景成功率与价格测试', status: 'PROPOSED_UNVALIDATED', sourceUrl, accessedAt: '2026-07-19' },
]
