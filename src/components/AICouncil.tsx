import { useState } from 'react'
import { councilMessages } from '../data/council'
import { SectionHeading } from './SectionHeading'

export const AICouncil = () => {
  const [current, setCurrent] = useState(-1)
  const started = current >= 0
  const finished = current === councilMessages.length - 1
  const currentMessage = started ? councilMessages[current] : undefined
  const completedMessages = started ? councilMessages.slice(0, current) : []

  return (
    <section className="section council-section" id="council" aria-label="AI Council 多角色评审">
      <SectionHeading
        eyebrow="05 · AI Council"
        title="不让一个模型既当运动员，也当裁判"
        description="八个角色依次提出发现、质疑与约束。这里播放的是已提交的录制输出，不是假装实时调用模型，也不冒充专家意见。"
      />
      <div className="demo-disclosure">
        <span>RECORDED AI REVIEW</span>
        本次 Codex 协作输出 · 可下载原始 JSON · 结论仍需专家与真实用户验证
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
              {completedMessages.length > 0 && (
                <div className="completed-summary">
                  <h4>已完成结论</h4>
                  <ol>
                    {completedMessages.map((message) => (
                      <li key={message.id}><span>{message.id}</span><p><strong>{message.role}</strong>{message.consequence}</p></li>
                    ))}
                  </ol>
                </div>
              )}
              <div className="message-stack" aria-live="polite">
                {currentMessage && (
                  <article className="council-message current" key={currentMessage.id}>
                    <div className="message-meta">
                      <span>{currentMessage.id}</span><span className={`stance stance-${currentMessage.stance}`}>{currentMessage.stance}</span>
                    </div>
                    <p className="role-name">{currentMessage.role}<small>{currentMessage.specialty}</small></p>
                    <blockquote>{currentMessage.message}</blockquote>
                    <p className="consequence"><span>方案响应</span>{currentMessage.consequence}</p>
                  </article>
                )}
              </div>
              <details className="full-council-transcript">
                <summary>展开完整评审记录</summary>
                <div>
                  {councilMessages.map((message) => (
                    <section key={message.id}>
                      <strong>{message.id} · {message.role}</strong>
                      <p>{message.message}</p>
                      <small>{message.consequence}</small>
                    </section>
                  ))}
                </div>
              </details>
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
