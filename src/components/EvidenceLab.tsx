import { useMemo, useState } from 'react'
import { evidenceItems } from '../data/evidence'
import { filterEvidence } from '../lib/evidence'
import type { ConfidenceLevel } from '../types'
import { SectionHeading } from './SectionHeading'

const dataTypeLabels = {
  PUBLIC_SOURCE: '真实公开资料',
  INTERVIEW_HYPOTHESIS: '访谈待验证',
  SYNTHETIC_DEMO: '合成演示',
} as const

const evidenceRoleLabels = {
  RULE_CONSTRAINT: '法规与规则',
  BRAND_CAPABILITY: '安克能力',
  COMPETITOR_EVIDENCE: '竞品证据',
  COUNTER_EVIDENCE: '反对当前概念',
  INTERVIEW_HYPOTHESIS: '用户命题',
  AI_CHALLENGE: 'AI 挑战',
} as const

export const EvidenceLab = () => {
  const [query, setQuery] = useState('')
  const [scene, setScene] = useState('')
  const [minSeverity, setMinSeverity] = useState(0)
  const [confidence, setConfidence] = useState<ConfidenceLevel | ''>('')
  const scenes = [...new Set(evidenceItems.map((item) => item.scene))]
  const filtered = useMemo(
    () =>
      filterEvidence(evidenceItems, {
        query,
        scene,
        minSeverity,
        confidence: confidence || undefined,
      }),
    [confidence, minSeverity, query, scene],
  )

  return (
    <section className="section" id="evidence">
      <SectionHeading
        eyebrow="02 · Evidence Lab"
        title="先区分什么是真的，再讨论什么值得做"
        description="公开资料只做可回溯摘要；用户需求与 AI 挑战分别标成待验证和合成演示。"
      />
      <div className="integrity-banner">
        <span className="integrity-icon" aria-hidden="true">✓</span>
        <div>
          <strong>数据诚信规则</strong>
          <p>没有来源的内容不会伪装成用户原话；AI 模拟只产生假设，不计入真实访谈样本。</p>
        </div>
      </div>
      <div className="evidence-counts" aria-label="证据组成">
        <strong>7条公开证据 / 3条待验证命题 / 2条AI合成挑战</strong>
        <span>公开来源增加了 1 条直接反对 Aero 差异化的 A1638 证据。</span>
      </div>
      <details className="severity-rubric">
        <summary>严重度评分标尺</summary>
        <ol>
          <li><strong>1</strong><span>轻微不便，有容易使用的替代方案</span></li>
          <li><strong>2</strong><span>反复摩擦，但任务仍容易完成</span></li>
          <li><strong>3</strong><span>明显延迟、困惑或体验妥协</span></li>
          <li><strong>4</strong><span>重要场景中的任务失败或强焦虑</span></li>
          <li><strong>5</strong><span>安全、合规或无法完成任务</span></li>
        </ol>
        <p>法规、竞品和能力证据的严重度表示其对立项判断的影响，不代表用户自述情绪。</p>
      </details>
      <div className="filter-panel" aria-label="证据筛选器">
        <label className="search-field">
          <span>搜索证据</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索问题、标签或证据 ID"
          />
        </label>
        <label>
          <span>场景</span>
          <select value={scene} onChange={(event) => setScene(event.target.value)}>
            <option value="">全部场景</option>
            {scenes.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>最低严重度</span>
          <select
            value={minSeverity}
            onChange={(event) => setMinSeverity(Number(event.target.value))}
          >
            <option value={0}>不限</option>
            {[3, 4, 5].map((value) => <option key={value} value={value}>{value} / 5</option>)}
          </select>
        </label>
        <label>
          <span>置信度</span>
          <select
            value={confidence}
            onChange={(event) => setConfidence(event.target.value as ConfidenceLevel | '')}
          >
            <option value="">全部置信度</option>
            <option value="高">高</option>
            <option value="中">中</option>
            <option value="待验证">待验证</option>
          </select>
        </label>
      </div>
      <div className="result-summary" aria-live="polite">
        <strong>{filtered.length}</strong> / {evidenceItems.length} 条证据命中
      </div>
      {filtered.length ? (
        <div className="evidence-grid">
          {filtered.map((item) => (
            <article className="evidence-card" key={item.id}>
              <div className="evidence-meta">
                <span>{item.id}</span>
                <span className={`type-badge type-${item.dataType.toLowerCase()}`}>
                  {dataTypeLabels[item.dataType]}
                </span>
              </div>
              <span className={`evidence-role role-${item.evidenceRole.toLowerCase()}`}>
                {evidenceRoleLabels[item.evidenceRole]}
              </span>
              <h3>{item.title}</h3>
              <p className="evidence-problem">{item.problem}</p>
              <dl className="evidence-details">
                <div><dt>场景</dt><dd>{item.scene}</dd></div>
                <div><dt>严重度</dt><dd className="severity-score"><strong>{item.severity}/5</strong><span>{'●'.repeat(item.severity)}<i>{'●'.repeat(5 - item.severity)}</i></span></dd></div>
                <div><dt>替代方案</dt><dd>{item.alternative}</dd></div>
                <div><dt>置信度</dt><dd>{item.confidence}</dd></div>
              </dl>
              <p className="evidence-summary">{item.summary}</p>
              <div className="tag-list">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
              {item.sourceUrl ? (
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">
                  查看原始来源 <span aria-hidden="true">↗</span>
                </a>
              ) : (
                <span className="validation-needed">尚无真实来源 · 需要验证</span>
              )}
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">没有符合当前条件的证据，请调整筛选项。</div>
      )}
    </section>
  )
}
