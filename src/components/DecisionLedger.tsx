import { runLedger } from '../data/runLedger'
import { assetPath } from '../lib/assets'
import { SectionHeading } from './SectionHeading'

const funnel = [
  { value: runLedger.funnel.raw, label: '个原始方向', detail: '未经排名的模型输出' },
  { value: runLedger.funnel.clusters, label: '个主题聚类', detail: '按任务与能力归一化' },
  { value: runLedger.funnel.finalists, label: '个候选', detail: '使用同一假设评分框架' },
  { value: runLedger.funnel.workingConcept, label: '个工作概念', detail: '不是已验证赢家' },
]

const decisionLabels = {
  WORKING_CONCEPT_NOT_VALIDATED: '工作概念 · 未验证',
  DEFERRED_COMMODITIZED: '暂缓 · 参数同质化',
  DEFERRED_OVERLAP: '暂缓 · 产品重合',
  REJECTED_EVIDENCE_GAP: '淘汰 · 证据缺口',
  DEFERRED_CAPABILITY_DISTANCE: '暂缓 · 能力距离',
} as const

const decisionTone = (decision: keyof typeof decisionLabels) => {
  if (decision.startsWith('WORKING')) return 'working'
  if (decision.startsWith('REJECTED')) return 'rejected'
  return 'deferred'
}

const artifactLinks = [
  ['机会生成 Prompt', 'pipeline/prompts/opportunity-generation.md'],
  ['原始输出 JSON', 'pipeline/runs/2026-07-19/raw-opportunities.json'],
  ['聚类与候选 JSON', 'pipeline/runs/2026-07-19/normalized-opportunities.json'],
  ['决策日志 JSON', 'pipeline/runs/2026-07-19/decision-ledger.json'],
  ['Council 原始记录', 'pipeline/runs/2026-07-19/council-transcript.json'],
  ['运行清单 Manifest', 'pipeline/runs/2026-07-19/run-manifest.json'],
] as const

export const DecisionLedger = () => (
  <section className="section ledger-section" id="ledger">
    <SectionHeading
      eyebrow="04 · Decision Ledger"
      title="AI 运行与决策账本"
      description="把输入、Prompt、原始输出、归一化、淘汰理由和待人工确认状态分开保存，避免用最终答案倒推过程。"
    />
    <div className="ledger-truth-banner">
      <span>RECORDED RUN</span>
      <div>
        <strong>本次 Codex 协作的真实提交记录</strong>
        <p>离线脚本只校验并回放已提交数据，不调用模型、不联网，也不把回放结果冒充新研究。</p>
      </div>
    </div>
    <div className="run-manifest-card">
      <div>
        <span>RUN ID</span>
        <strong>{runLedger.runId}</strong>
      </div>
      <div>
        <span>MODEL</span>
        <strong>{runLedger.model}</strong>
      </div>
      <div>
        <span>DATE</span>
        <strong>{runLedger.runDate}</strong>
      </div>
      <div>
        <span>AUTHOR REVIEW</span>
        <strong className="review-pending">待赵子健确认</strong>
      </div>
    </div>
    <div className="funnel-grid" aria-label="创意淘汰漏斗">
      {funnel.map((item, index) => (
        <div key={item.label}>
          <span>{String(index + 1).padStart(2, '0')}</span>
          <p><strong>{item.value} {item.label}</strong></p>
          <small>{item.detail}</small>
          {index < funnel.length - 1 && <i aria-hidden="true">→</i>}
        </div>
      ))}
    </div>
    <div className="ledger-body">
      <div className="decision-list">
        <div className="ledger-subheading">
          <p className="eyebrow">Accept / reject trail</p>
          <h3>五个候选为什么留下或退出</h3>
        </div>
        {runLedger.decisions.map((decision) => (
          <article key={decision.candidateId}>
            <div>
              <span className={`decision-status decision-${decisionTone(decision.decision)}`}>
                {decisionLabels[decision.decision]}
              </span>
              <h4>{decision.candidateName}</h4>
            </div>
            <dl>
              <div><dt>保留理由</dt><dd>{decision.reason}</dd></div>
              <div><dt>反对压力</dt><dd>{decision.challenge}</dd></div>
              <div><dt>关联证据</dt><dd>{decision.evidenceIds.length ? decision.evidenceIds.join(' · ') : '无链接证据'}</dd></div>
            </dl>
          </article>
        ))}
      </div>
      <aside className="artifact-panel">
        <p className="eyebrow">Inspect the run</p>
        <h3>不要相信摘要，直接看产物</h3>
        <code>python run_pipeline.py --demo</code>
        <p>输出证据卡、机会排序、Council 记录和决策日志；命令首行会声明 NO MODEL OR NETWORK CALL。</p>
        <div className="artifact-links">
          {artifactLinks.map(([label, path]) => (
            <a key={path} href={assetPath(path)} target="_blank" rel="noreferrer">
              <span>JSON / MD</span><strong>{label}</strong><i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </aside>
    </div>
  </section>
)
