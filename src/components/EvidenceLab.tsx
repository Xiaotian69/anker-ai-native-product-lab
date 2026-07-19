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
              <h3>{item.title}</h3>
              <p className="evidence-problem">{item.problem}</p>
              <dl className="evidence-details">
                <div><dt>场景</dt><dd>{item.scene}</dd></div>
                <div><dt>严重度</dt><dd>{'●'.repeat(item.severity)}<span>{'●'.repeat(5 - item.severity)}</span></dd></div>
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
