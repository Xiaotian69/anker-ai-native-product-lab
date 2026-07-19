const navItems = [
  ['方法', 'scope'],
  ['证据', 'evidence'],
  ['机会', 'opportunity'],
  ['评审', 'council'],
  ['产品', 'product'],
  ['迭代', 'evolution'],
  ['资料', 'resources'],
]

export const Header = () => (
  <header className="site-header">
    <a className="brand" href="#top" aria-label="返回页面顶部">
      <span className="brand-mark" aria-hidden="true">
        AL
      </span>
      <span>
        <strong>AI Native Product Lab</strong>
        <small>Evidence → Decision → Product</small>
      </span>
    </a>
    <nav className="main-nav" aria-label="主要导航">
      {navItems.map(([label, id]) => (
        <a key={id} href={`#${id}`}>
          {label}
        </a>
      ))}
    </nav>
  </header>
)
