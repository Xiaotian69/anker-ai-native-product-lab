import { assetPath } from '../lib/assets'
import { SectionHeading } from './SectionHeading'

const downloads = [
  ['项目研究说明', 'docs/research-notes.md', 'MD'],
  ['SCOPE 方法论', 'docs/methodology.md', 'MD'],
  ['用户访谈提纲', 'docs/interview-guide.md', 'MD'],
  ['证据卡模板', 'docs/evidence-template.csv', 'CSV'],
  ['用户研究员提示词', 'prompts/user-researcher.md', 'PROMPT'],
  ['产品经理提示词', 'prompts/product-manager.md', 'PROMPT'],
  ['硬件工程师提示词', 'prompts/hardware-engineer.md', 'PROMPT'],
  ['合规专家提示词', 'prompts/compliance-expert.md', 'PROMPT'],
  ['红队评审提示词', 'prompts/red-team.md', 'PROMPT'],
]

const references = [
  ['FAA · Airline Passengers and Batteries', '随身携带、Wh 与承运人限制', 'https://www.faa.gov/hazmat/packsafe/airline-passengers-and-batteries'],
  ['Anker · Official Product Categories', '移动充电与连接产品能力', 'https://www.anker.com/'],
  ['安克创新 · 我们的品牌', '充电储能与品牌组合', 'https://www.anker.com.cn/brands'],
  ['The Verge · Nano Charging Station', '伸缩线与状态显示趋势', 'https://www.theverge.com/news/709301/anker-nano-charging-station-usb-retractable'],
]

export const Resources = () => (
  <section className="section resources-section" id="resources">
    <SectionHeading
      eyebrow="08 · Resources"
      title="把方法、模板和提示词一起交付"
      description="评委可以复核来源，也可以下载材料复现同一套产品定义流程。"
    />
    <div className="resource-hero">
      <div>
        <p className="eyebrow">Competition proposal · 13 pages</p>
        <h3>《Anker AI原生产品设计与定义方案》</h3>
        <p>包含产品概念、SCOPE 方法论、用户洞察、AI 多角色协作、验证迭代与四周执行计划。</p>
      </div>
      <a className="button button-primary" href={assetPath('docs/Anker_AI原生产品设计方案_赵子健.pdf')} download>
        下载项目 PDF <span aria-hidden="true">↓</span>
      </a>
    </div>
    <div className="resource-columns">
      <div>
        <h3>可复用研究工具</h3>
        <div className="download-list">
          {downloads.map(([name, path, type]) => (
            <a href={assetPath(path)} key={path} download>
              <span>{type}</span><strong>{name}</strong><i aria-hidden="true">↓</i>
            </a>
          ))}
        </div>
      </div>
      <div>
        <h3>公开资料 · 访问日期 2026-07-19</h3>
        <div className="reference-list">
          {references.map(([name, detail, url], index) => (
            <a href={url} target="_blank" rel="noreferrer" key={url}>
              <span>0{index + 1}</span><p><strong>{name}</strong><small>{detail}</small></p><i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </div>
    </div>
  </section>
)
