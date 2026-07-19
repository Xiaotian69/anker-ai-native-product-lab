import { SectionHeading } from './SectionHeading'

const stages = [
  ['S', 'Scan', '扫描真实证据', '公开资料、法规、竞品与访谈原文'],
  ['C', 'Construct', '构建需求图谱', '聚类问题、标注置信度并统一排序'],
  ['O', 'Orchestrate', '多角色共创', '用户、产品、工程、供应链与红队冲突'],
  ['P', 'Prove', '验证关键假设', 'AI 压测、专家约束与真实用户原型测试'],
  ['E', 'Evolve', '反馈驱动进化', '让新证据回写需求与版本决策'],
]

export const ScopeFlow = () => (
  <section className="section scope-section" id="scope">
    <SectionHeading
      eyebrow="01 · Method"
      title="SCOPE：把产品定义变成可追溯的双闭环"
      description="AI 扩大搜索与挑战范围，人负责证据审核、边界判断和最终取舍。"
    />
    <div className="scope-flow">
      {stages.map(([letter, english, title, detail], index) => (
        <article className="scope-card" key={letter}>
          <div className="scope-index">0{index + 1}</div>
          <div className="scope-letter">{letter}</div>
          <p className="scope-english">{english}</p>
          <h3>{title}</h3>
          <p>{detail}</p>
        </article>
      ))}
    </div>
    <div className="loop-note">
      <span>证据闭环</span> 新资料更新需求图谱
      <span aria-hidden="true">↔</span>
      <span>验证闭环</span> 测试结果改变产品版本
    </div>
  </section>
)
