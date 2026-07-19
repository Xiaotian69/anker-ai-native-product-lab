import type { EvolutionStep } from '../types'

export const evolutionSteps: EvolutionStep[] = [
  {
    version: 'V0',
    concept: '65W 有线快充 + 无线充',
    issue: '功能叠加让热、体积和航旅安全定位相互冲突。',
    evidenceIds: ['S-002'],
    decision: '移除无线充并降低目标功率。',
    status: '被工程约束淘汰',
  },
  {
    version: 'V1',
    concept: '45W 有线快充 + 数字温度',
    issue: '数字存在不代表用户会持续观察或理解。',
    evidenceIds: ['S-001', 'H-001'],
    decision: '增加无需持续读取的分级温感环。',
    status: '进入理解度验证',
  },
  {
    version: 'V2',
    concept: '低功耗屏 + 温感环 + 座椅固定',
    issue: '固定公共座椅可能有兼容、稳定和规则风险。',
    evidenceIds: ['E-003', 'H-003'],
    decision: '改为可拆的个人包带夹扣。',
    status: '进入纸模测试',
  },
  {
    version: 'V3',
    concept: '清晰 Wh + 可见状态 + 包带夹扣',
    issue: '用户仍需自行核对承运人规则，产品不能替代最终判断。',
    evidenceIds: ['E-001', 'E-002', 'E-003'],
    decision: '收紧宣传边界，突出信息可读与风险提示。',
    status: '当前候选方案',
  },
]
