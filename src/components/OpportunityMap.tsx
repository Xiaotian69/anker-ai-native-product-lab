import { useMemo, useState } from 'react'
import { opportunityCandidates } from '../data/opportunities'
import { calculateOpportunityScore, rankOpportunities } from '../lib/opportunity'
import type { OpportunityInputs } from '../types'
import { MetricBars } from './MetricBars'
import { SectionHeading } from './SectionHeading'
import { SensitivityPanel } from './SensitivityPanel'

const controls: [keyof OpportunityInputs, string, string][] = [
  ['confidence', '证据置信度 C', '结论被真实资料支持的程度'],
  ['frequency', '出现频率 F', '问题发生或被提及的频率'],
  ['severity', '问题严重度 S', '对任务完成和安全感的影响'],
  ['trend', '趋势性 T', '外部规则与行为是否强化机会'],
  ['willingness', '付费意愿 W', '仍需真实价格测试的价值假设'],
  ['capability', '安克能力匹配 A', '技术与供应链的相邻程度'],
  ['risk', '技术与合规风险 R', '从总分直接扣除的约束'],
]

export const OpportunityMap = () => {
  const [selectedId, setSelectedId] = useState(opportunityCandidates[0].id)
  const selected = opportunityCandidates.find((item) => item.id === selectedId)!
  const [values, setValues] = useState<OpportunityInputs>({ ...selected })
  const score = calculateOpportunityScore(values)
  const ranking = useMemo(
    () => rankOpportunities(opportunityCandidates.map((item) => ({
      id: item.id,
      name: item.name,
      score: calculateOpportunityScore(item),
    }))),
    [],
  )

  const selectCandidate = (id: string) => {
    const candidate = opportunityCandidates.find((item) => item.id === id)!
    setSelectedId(id)
    setValues({ ...candidate })
  }

  return (
    <section className="section opportunity-section" id="opportunity">
      <SectionHeading
        eyebrow="03 · Opportunity Map"
        title="让判断有刻度，但不假装它是预测"
        description="统一评分让团队能看见权重和风险如何改变排序；数字不会替代市场验证。"
      />
      <div className="model-note">
        <div><span>O</span> = C × (0.25F + 0.25S + 0.15T + 0.15W + 0.20A) − R</div>
        <strong>机会排序工具，不是市场预测</strong>
      </div>
      <div className="opportunity-tabs" role="tablist" aria-label="候选机会方向">
        {opportunityCandidates.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={item.id === selectedId}
            onClick={() => selectCandidate(item.id)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="score-workbench">
        <div className="slider-panel">
          <div className="workbench-title">
            <div><p>当前实验方向</p><h3>{selected.name}</h3></div>
            <div className="score-display" aria-live="polite">
              <span>OPPORTUNITY SCORE</span>
              <strong>{score.toFixed(1)}</strong>
              <small>理论区间 −5 至 25</small>
            </div>
          </div>
          <p>{selected.description}</p>
          <div className="baseline-disclosure">
            <span>SYNTHETIC DEMO</span>
            <p>{selected.scoreBasis}</p>
            <small>
              {selected.evidenceIds.length
                ? `关联证据：${selected.evidenceIds.join(' · ')}`
                : '无已链接证据 · 仅用于演示评分界面'}
            </small>
          </div>
          <div className="slider-list">
            {controls.map(([key, label, hint]) => (
              <label key={key}>
                <span><strong>{label}</strong><small>{hint}</small></span>
                <input
                  type="range"
                  aria-label={label}
                  min="0"
                  max="5"
                  step="0.1"
                  value={values[key]}
                  onChange={(event) => setValues((current) => ({
                    ...current,
                    [key]: Number(event.target.value),
                  }))}
                />
                <output>{values[key].toFixed(1)}</output>
              </label>
            ))}
          </div>
        </div>
        <div className="score-visuals">
          <MetricBars values={values} />
          <div className="ranking-card">
            <p className="eyebrow">Baseline ranking</p>
            <h3>五个方向的基线比较</h3>
            <span className="synthetic-label">合成演示基线</span>
            <ol>
              {ranking.map((item, index) => (
                <li key={item.id} className={item.id === selectedId ? 'active' : ''}>
                  <span>0{index + 1}</span>
                  <div><strong>{item.name}</strong><i style={{ width: `${Math.max(0, item.score / 25) * 100}%` }} /></div>
                  <b>{item.score.toFixed(1)}</b>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <SensitivityPanel />
    </section>
  )
}
