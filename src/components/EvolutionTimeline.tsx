import { evolutionSteps } from '../data/evolution'
import { SectionHeading } from './SectionHeading'

export const EvolutionTimeline = () => (
  <section className="section" id="evolution">
    <SectionHeading
      eyebrow="06 · Evolution"
      title="不是“迭代了四版”，而是哪条证据改了哪一版"
      description="每个版本保留被否定的原因，避免只展示看似顺滑的最终答案。"
    />
    <div className="evolution-line">
      {evolutionSteps.map((step, index) => (
        <article key={step.version} className={index === evolutionSteps.length - 1 ? 'current' : ''}>
          <div className="version-marker"><span>{step.version}</span><i /></div>
          <div className="evolution-card">
            <span className="evolution-status">{step.status}</span>
            <h3>{step.concept}</h3>
            <dl>
              <div><dt>发现问题</dt><dd>{step.issue}</dd></div>
              <div><dt>证据触发</dt><dd>{step.evidenceIds.map((id) => <span key={id}>{id}</span>)}</dd></div>
              <div><dt>设计决策</dt><dd>{step.decision}</dd></div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  </section>
)
