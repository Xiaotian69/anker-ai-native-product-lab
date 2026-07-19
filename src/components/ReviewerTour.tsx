import { useEffect, useRef, useState } from 'react'

const tourSteps = [
  { target: 'evidence', title: '先看证据边界', description: '区分 7 条公开资料、3 条待验证命题和 2 条 AI 挑战，并先看反对 Aero 的 E-007。' },
  { target: 'ledger', title: '再看 AI 是否真的运行', description: '检查 Prompt、30 个原始方向、聚类、候选和每次淘汰的原始文件。' },
  { target: 'council', title: '看冲突如何改变方案', description: '八个角色不会形成虚假共识，而是把假设变成工程、合规和用户验证门。' },
  { target: 'product', title: '只保留可证明的差异', description: 'A1638 已有的规格全部视为平价，Aero 只提出三项待验证任务差异。' },
  { target: 'validation', title: '最后看什么会让概念失败', description: '四项测试都预先写明成功门槛和不通过后的删除、改型或停止决策。' },
] as const

interface ReviewerTourProps {
  onClose: () => void
}

export const ReviewerTour = ({ onClose }: ReviewerTourProps) => {
  const [current, setCurrent] = useState(0)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const step = tourSteps[current]
  const finished = current === tourSteps.length - 1

  useEffect(() => {
    const target = document.getElementById(step.target)
    const reduceMotion = typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
    titleRef.current?.focus()
  }, [step.target])

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [onClose])

  return (
    <aside
      className="reviewer-tour"
      role="dialog"
      aria-modal="false"
      aria-labelledby="reviewer-tour-title"
    >
      <div className="tour-progress">
        <span>评委 3 分钟导览</span>
        <strong>{current + 1} / {tourSteps.length}</strong>
      </div>
      <div className="tour-progress-track" aria-hidden="true">
        <i style={{ width: `${((current + 1) / tourSteps.length) * 100}%` }} />
      </div>
      <p className="eyebrow">STOP · {step.target.toUpperCase()}</p>
      <h2 id="reviewer-tour-title" ref={titleRef} tabIndex={-1} aria-live="polite">{step.title}</h2>
      <p>{step.description}</p>
      <div className="tour-controls">
        <button type="button" className="button button-ghost" onClick={onClose}>关闭导览</button>
        {current > 0 && (
          <button type="button" className="tour-back" onClick={() => setCurrent((value) => value - 1)}>上一站</button>
        )}
        <button
          type="button"
          className="button button-primary"
          onClick={() => finished ? onClose() : setCurrent((value) => value + 1)}
        >
          {finished ? '完成导览' : '下一站'} <span aria-hidden="true">→</span>
        </button>
      </div>
    </aside>
  )
}
