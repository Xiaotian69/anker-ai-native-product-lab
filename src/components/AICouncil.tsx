import { useState } from 'react'
import { councilMessages } from '../data/council'
import { SectionHeading } from './SectionHeading'

export const AICouncil = () => {
  const [current, setCurrent] = useState(-1)
  const started = current >= 0
  const finished = current === councilMessages.length - 1
  const visibleMessages = started ? councilMessages.slice(0, current + 1) : []

  return (
    <section className="section council-section" id="council">
      <SectionHeading
        eyebrow="04 · AI Council"
        title="不让一个模型既当运动员，也当裁判"
        description="八个角色依次提出发现、质疑与约束。这里播放的是本地剧本，用于演示工作流，不是假装实时调用大模型。"
      />
      <div className="demo-disclosure">
        <span>DEMO</span>
        多智能体工作流演示 · 内容为合成评审记录 · 结论仍需专家与真实用户验证
      </div>
      <div className="council-layout">
        <div className="role-rail" aria-label="评审角色进度">
          {councilMessages.map((message, index) => (
            <div
              key={message.id}
              className={index < current ? 'complete' : index === current ? 'active' : ''}
            >
              <span>{index < current ? '✓' : String(index + 1).padStart(2, '0')}</span>
              <p><strong>{message.role}</strong><small>{message.specialty}</small></p>
            </div>
          ))}
        </div>
        <div className="council-stage">
          {!started ? (
            <div className="council-ready">
              <div className="council-radar" aria-hidden="true"><i /><i /><span>8</span></div>
              <p className="eyebrow">Council ready</p>
              <h3>让方案先在会议室里失败一次</h3>
              <p>点击开始，观察同一概念如何被证据、用户、工程、供应链与合规连续改写。</p>
              <button className="button button-primary" type="button" onClick={() => setCurrent(0)}>
                开始评审 <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <>
              <div className="council-progress">
                <span style={{ width: `${((current + 1) / councilMessages.length) * 100}%` }} />
              </div>
              <div className="message-stack" aria-live="polite">
                {visibleMessages.map((message, index) => (
                  <article className={index === current ? 'council-message current' : 'council-message'} key={message.id}>
                    <div className="message-meta">
                      <span>{message.id}</span><span className={`stance stance-${message.stance}`}>{message.stance}</span>
                    </div>
                    <p className="role-name">{message.role}<small>{message.specialty}</small></p>
                    <blockquote>{message.message}</blockquote>
                    <p className="consequence"><span>方案响应</span>{message.consequence}</p>
                  </article>
                ))}
              </div>
              <div className="council-controls">
                <button className="button button-ghost" type="button" onClick={() => setCurrent(-1)}>重置评审</button>
                {!finished && (
                  <button className="button button-primary" type="button" onClick={() => setCurrent((value) => value + 1)}>
                    下一位角色 <span aria-hidden="true">→</span>
                  </button>
                )}
                {finished && <span className="review-complete">评审完成 · 进入真实验证</span>}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
