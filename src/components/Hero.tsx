const evidenceSignals = [
  ['12', '证据与待验证命题'],
  ['05', '候选机会方向'],
  ['08', 'AI 评审角色'],
  ['04', '概念迭代版本'],
]

export const Hero = () => (
  <section className="hero" id="top">
    <div className="hero-glow" aria-hidden="true" />
    <div className="hero-copy">
      <p className="eyebrow">2026 AI先锋未来人才大赛 · 安克创新命题</p>
      <h1>
        当移动电源在旅途中必须
        <span>可见、可接触、可判断，</span>
        为什么现有产品仍主要围绕容量与功率设计？
      </h1>
      <p className="hero-lead">
        这里不展示一份由 AI 代写的 PRD，而是公开一条从真实资料、待验证假设、
        多角色质疑到产品取舍的证据链。
      </p>
      <div className="hero-actions">
        <a className="button button-primary" href="#evidence">
          进入产品实验室 <span aria-hidden="true">↘</span>
        </a>
        <a className="button button-ghost" href="#product">
          查看 Aero 10K 概念
        </a>
      </div>
      <p className="independence-note">
        <span aria-hidden="true">◇</span> 独立参赛项目 · 非安克官方产品或授权页面
      </p>
    </div>
    <aside className="hero-console" aria-label="项目证据链概览">
      <div className="console-topline">
        <span>LAB STATUS</span>
        <span className="status-dot">RESEARCH</span>
      </div>
      <div className="console-orbit" aria-hidden="true">
        <span>S</span>
        <span>C</span>
        <span>O</span>
        <span>P</span>
        <span>E</span>
      </div>
      <div className="signal-grid">
        {evidenceSignals.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="console-caption">
        当前阶段：机会定义 · 参数、成本与用户价值仍待真实验证
      </p>
    </aside>
  </section>
)
