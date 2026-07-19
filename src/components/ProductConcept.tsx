import { ProductVisual } from './ProductVisual'
import { SectionHeading } from './SectionHeading'
import { CompetitorMatrix } from './CompetitorMatrix'

const specs = [
  ['10,000 mAh', '约 36 Wh · 清晰机身标识'],
  ['45W USB-C', '双向有线快充 · 待工程验证'],
  ['Retractable C', '内置伸缩 USB-C 线'],
  ['Visible Safety', '电量、Wh、温度与状态'],
]

const features = [
  ['01', '温感变色安全环', '用分级颜色提供被动提醒，理解度与阈值仍需测试。'],
  ['02', '异常断电与提醒', '多点温度监测的建议方案，需热仿真与样机验证。'],
  ['03', '航旅模式', '限制充放电功率与误触，不替代航司规则判断。'],
  ['04', '端口保护', '降低异物接触与短路风险，结构寿命需验证。'],
  ['05', '包带夹扣／支架', '固定在个人物品上，不依赖公共座椅结构。'],
]

export const ProductConcept = () => (
  <section className="section product-section" id="product">
    <SectionHeading
      eyebrow="05 · Product Concept"
      title="Anker Aero 10K：让旅途用电状态更容易被判断"
      description="这是由当前证据链推导出的候选概念，不是已立项、已量产或已获认证的安克产品。"
    />
    <div className="product-layout">
      <div className="visual-stage">
        <div className="concept-tag">ORIGINAL CONCEPT · V3</div>
        <ProductVisual />
      </div>
      <div className="product-copy">
        <p className="eyebrow">Proposed specification</p>
        <h3>可见、可控、可解释</h3>
        <p>主动放弃无线充，把功耗、热与结构预算留给航旅任务中的信息可见和防护。</p>
        <div className="spec-grid">
          {specs.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
        <div className="feature-list">
          {features.map(([index, title, detail]) => (
            <div key={index}><span>{index}</span><p><strong>{title}</strong><small>{detail}</small></p></div>
          ))}
        </div>
      </div>
    </div>
    <CompetitorMatrix />
    <div className="disclaimer-grid">
      <div><strong>参数边界</strong><p>以上参数均为待验证建议，容量、功率、温升、寿命与成本需工程评估。</p></div>
      <div><strong>项目身份</strong><p>本项目为独立参赛研究，不代表安克官方，也不构成产品发布。</p></div>
      <div><strong>合规边界</strong><p>不作跨航司统一认证或零风险承诺；携带与使用要求以承运人最新规定为准。</p></div>
    </div>
  </section>
)
