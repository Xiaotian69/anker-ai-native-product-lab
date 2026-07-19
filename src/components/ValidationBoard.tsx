import { validationHypotheses } from '../data/validation'
import { SectionHeading } from './SectionHeading'

export const ValidationBoard = () => (
  <section className="section validation-section" id="validation">
    <SectionHeading
      eyebrow="08 · Prove"
      title="真实验证看板"
      description="AI 不负责宣布答案，而是把概念拆成可以失败、可以删除、可以停止的命题。"
    />
    <div className="validation-disclosure">
      <span>0 / 4 RUN</span>
      <p><strong>当前没有已完成的访谈或原型测试。</strong>成功门槛先于结果公开，失败决策不会等测试结束后再改写。</p>
    </div>
    <div className="validation-grid">
      {validationHypotheses.map((item, index) => (
        <article key={item.id}>
          <div className="validation-card-top">
            <span>{item.id}</span>
            <strong>未执行</strong>
          </div>
          <p className="validation-index">0{index + 1}</p>
          <h3>{item.hypothesis}</h3>
          <dl>
            <div><dt>验证方法</dt><dd>{item.method}</dd></div>
            <div><dt>成功门槛</dt><dd>{item.threshold}</dd></div>
          </dl>
          <div className="failure-decision">
            <span>如果不通过</span>
            <strong>{item.failureDecision}</strong>
          </div>
        </article>
      ))}
    </div>
    <p className="validation-footnote">
      支付意愿的数字门槛需要在价格和目标市场明确后预注册；当前不制造一个看似精确的购买率。
    </p>
  </section>
)
