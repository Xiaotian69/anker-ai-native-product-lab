import { opportunityCandidates } from '../data/opportunities'
import { analyzeSensitivity, opportunityScenarios } from '../lib/sensitivity'

const analysis = analyzeSensitivity(opportunityCandidates, opportunityScenarios)
const baselineWinner = analysis[0].ranking[0].id
const changedScenarios = analysis.slice(1).filter((item) => item.ranking[0].id !== baselineWinner)

export const SensitivityPanel = () => (
  <div className="sensitivity-panel">
    <div className="sensitivity-heading">
      <div>
        <p className="eyebrow">Weight challenge</p>
        <h3>敏感性分析</h3>
      </div>
      <p>
        {changedScenarios.length
          ? `${changedScenarios.map((item) => item.scenario.name).join('、')}会改变第一名。`
          : '三组权重下第一名未变化，但名次与分差会变化。'}
      </p>
    </div>
    <div className="scenario-grid">
      {analysis.map(({ scenario, ranking }) => (
        <article key={scenario.id}>
          <div className="scenario-title">
            <span>{scenario.id === 'balanced' ? 'BASELINE' : 'CHALLENGE'}</span>
            <h4>{scenario.name}</h4>
          </div>
          <p>{scenario.description}</p>
          <ol>
            {ranking.map((item, index) => (
              <li key={item.id}>
                <span>{index + 1}</span>
                <strong>{item.name}</strong>
                <b>{item.score.toFixed(1)}</b>
              </li>
            ))}
          </ol>
        </article>
      ))}
    </div>
    <p className="sensitivity-disclosure">
      三组输入都来自 SYNTHETIC_DEMO 工作坊基线；敏感性分析只检查结论是否依赖权重，不把假设分变成市场事实。
    </p>
  </div>
)
