import type { OpportunityInputs } from '../types'

const metrics: [keyof OpportunityInputs, string][] = [
  ['confidence', '证据置信度'],
  ['frequency', '出现频率'],
  ['severity', '问题严重度'],
  ['trend', '趋势性'],
  ['willingness', '付费意愿'],
  ['capability', '能力匹配'],
  ['risk', '风险扣分'],
]

export const MetricBars = ({ values }: { values: OpportunityInputs }) => (
  <div className="metric-bars" aria-label="机会指标条形图">
    {metrics.map(([key, label]) => (
      <div className={key === 'risk' ? 'metric-row risk' : 'metric-row'} key={key}>
        <span>{label}</span>
        <div className="metric-track">
          <i style={{ width: `${(values[key] / 5) * 100}%` }} />
        </div>
        <strong>{values[key].toFixed(1)}</strong>
      </div>
    ))}
  </div>
)
