import { comparisonRows } from '../data/comparison'
import { SectionHeading } from './SectionHeading'

export const MethodComparison = () => (
  <section className="section comparison-section" id="comparison">
    <SectionHeading
      eyebrow="09 · Method Shift"
      title="AI 驱动，不等于把传统流程交给 ChatGPT"
      description="真正变化的是证据规模、角色关系、约束介入时机与决策可追溯性。"
    />
    <div className="comparison-table" role="table" aria-label="传统方法与 AI 原生方法对比">
      <div className="comparison-header" role="row">
        <span role="columnheader">环节</span><span role="columnheader">传统经验驱动</span><span role="columnheader">AI 原生方法</span>
      </div>
      {comparisonRows.map((row) => (
        <div className="comparison-row" role="row" key={row.dimension}>
          <strong role="cell">{row.dimension}</strong><p role="cell">{row.traditional}</p><p role="cell">{row.aiNative}</p>
        </div>
      ))}
    </div>
    <blockquote className="method-thesis">
      <span>“</span>
      传统方法把 AI 当助手；AI 原生方法把产品定义变成持续学习、可追溯的决策系统。
    </blockquote>
  </section>
)
