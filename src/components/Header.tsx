import { useEffect, useState } from 'react'
import { ReviewerTour } from './ReviewerTour'

const navItems = [
  ['方法', 'scope'],
  ['证据', 'evidence'],
  ['机会', 'opportunity'],
  ['账本', 'ledger'],
  ['评审', 'council'],
  ['产品', 'product'],
  ['迭代', 'evolution'],
  ['验证', 'validation'],
  ['资料', 'resources'],
]

export const Header = () => {
  const [activeSection, setActiveSection] = useState('scope')
  const [tourOpen, setTourOpen] = useState(false)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => left.boundingClientRect.top - right.boundingClientRect.top)
        if (visible[0]?.target.id) setActiveSection(visible[0].target.id)
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15] },
    )
    navItems.forEach(([, id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回页面顶部">
          <span className="brand-mark" aria-hidden="true">AL</span>
          <span>
            <strong>AI Native Product Lab</strong>
            <small>Evidence → Decision → Product</small>
          </span>
        </a>
        <nav className="main-nav" aria-label="主要导航">
          {navItems.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? 'location' : undefined}
              onClick={() => setActiveSection(id)}
            >
              {label}
            </a>
          ))}
        </nav>
        <button className="tour-launch" type="button" onClick={() => setTourOpen(true)}>
          评委 3 分钟导览 <span aria-hidden="true">↗</span>
        </button>
      </header>
      {tourOpen && <ReviewerTour onClose={() => setTourOpen(false)} />}
    </>
  )
}
