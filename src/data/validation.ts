import type { ValidationHypothesis } from '../types'

export const validationHypotheses: ValidationHypothesis[] = [
  { id: 'V-01', hypothesis: '用户无需解释即可正确理解温感提示', method: '10 人盲测概念测试', threshold: '至少 8/10 人正确解释', status: 'NOT_RUN', failureDecision: '删除或重新设计温感提示' },
  { id: 'V-02', hypothesis: '持续显示 Wh 能降低规则判断成本', method: '与常规标签进行 A/B 计时任务', threshold: '速度至少提升 20%，且正确率不下降', status: 'NOT_RUN', failureDecision: '恢复常规标签，不再把状态屏作为差异' },
  { id: 'V-03', hypothesis: '包带固定能提高狭窄座位中的取用效率', method: '10 人坐姿取用与收纳任务', threshold: '至少 9/10 人无钩挂完成', status: 'NOT_RUN', failureDecision: '改为挂绳或独立收纳结构' },
  { id: 'V-04', hypothesis: '用户愿意为航旅功能组合支付溢价', method: '价格梯度概念访谈', threshold: '访谈前预注册目标购买率', status: 'NOT_RUN', failureDecision: '改为高端型号可选功能或停止概念' },
]
