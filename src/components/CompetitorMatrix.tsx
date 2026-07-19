import { competitorRows } from '../data/competitors'

export const CompetitorMatrix = () => (
  <div className="competitor-matrix">
    <div className="matrix-heading">
      <div>
        <p className="eyebrow">Counter-evidence · E-007</p>
        <h3>不是 A1638 加一个温感环，而是三项待验证任务差异</h3>
      </div>
      <a
        href="https://www.anker.com/products/a1638-10k-45w-power-bank"
        target="_blank"
        rel="noreferrer"
      >
        A1638 官方页面 <span aria-hidden="true">↗</span>
      </a>
    </div>
    <p className="matrix-thesis">
      官方页面已经确认容量、功率、伸缩线、智能屏与 ActiveShield 温控。Aero 只有在规则判断、异常感知和狭窄场景取用任务中胜出，才算形成差异。
    </p>
    <div className="comparison-table-wrap">
      <table>
        <caption>A1638 官方能力与 Aero 10K 待验证差异</caption>
        <thead>
          <tr><th>能力</th><th>现有 A1638</th><th>Aero 10K 建议</th><th>需要什么证明</th><th>结论</th></tr>
        </thead>
        <tbody>
          {competitorRows.map((row) => (
            <tr key={row.capability}>
              <th scope="row">{row.capability}</th>
              <td data-label="现有 A1638">{row.a1638}</td>
              <td data-label="Aero 10K 建议">{row.aero}</td>
              <td data-label="需要什么证明">{row.proof}</td>
              <td data-label="结论">
                <span className={`matrix-status matrix-${row.status.toLowerCase()}`}>
                  {row.status === 'PARITY' ? '已有，不构成差异' : '待验证差异'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="source-note">来源：Anker A1638 官方产品页 · 访问日期 2026-07-19</p>
  </div>
)
