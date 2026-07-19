import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

const scrollIntoView = vi.fn()
let intersectionCallback: IntersectionObserverCallback = () => undefined

class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds = [0]
  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback
  }
  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn(() => [])
  unobserve = vi.fn()
}

beforeEach(() => {
  scrollIntoView.mockClear()
  window.HTMLElement.prototype.scrollIntoView = scrollIntoView
  vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
})

describe('product lab application', () => {
  it('renders the evidence-to-product narrative and disclosures', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /当移动电源在旅途中必须可见、可接触、可判断/,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText('可判断，', { selector: '.hero-phrase' })).toBeInTheDocument()
    expect(screen.getAllByText(/独立参赛项目/).length).toBeGreaterThan(0)
    expect(screen.getByText('12', { selector: '.signal-grid strong' })).toBeInTheDocument()
    expect(screen.getByLabelText('搜索证据')).toBeInTheDocument()
    expect(screen.getByLabelText('证据置信度 C')).toBeInTheDocument()
    expect(screen.getByText('机会排序工具，不是市场预测')).toBeInTheDocument()
    expect(screen.getByText('合成演示基线')).toBeInTheDocument()
    expect(screen.getByText('理论区间 −5 至 25')).toBeInTheDocument()
    expect(screen.getByText('7条公开证据 / 3条待验证命题 / 2条AI合成挑战')).toBeInTheDocument()
    expect(screen.getAllByText('5/5').length).toBeGreaterThan(0)
    expect(screen.getByText('严重度评分标尺')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: '敏感性分析' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'AI 运行与决策账本' })).toBeInTheDocument()
    expect(screen.getByText('30 个原始方向')).toBeInTheDocument()
    expect(screen.getByText('10 个主题聚类')).toBeInTheDocument()
    expect(screen.getByText('5 个候选')).toBeInTheDocument()
    expect(screen.getByText('1 个工作概念')).toBeInTheDocument()
    expect(screen.getByText('待赵子健确认')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /原始输出 JSON/ })).toHaveAttribute(
      'href',
      expect.stringContaining('/pipeline/'),
    )
    expect(screen.getByRole('heading', { name: /不是 A1638 加一个温感环/ })).toBeInTheDocument()
    expect(screen.getAllByText('已有，不构成差异').length).toBeGreaterThan(1)
    expect(screen.getByRole('link', { name: /A1638 官方页面/ })).toHaveAttribute(
      'href',
      'https://www.anker.com/products/a1638-10k-45w-power-bank',
    )
    expect(screen.getByRole('heading', { name: '真实验证看板' })).toBeInTheDocument()
    expect(screen.getAllByText('未执行')).toHaveLength(4)
    expect(screen.getByText('删除或重新设计温感提示')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '开始评审' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /下载项目 PDF/ })).toHaveAttribute(
      'href',
      expect.stringContaining('/docs/Anker_AI原生产品设计方案_赵子健.pdf'),
    )
  })

  it('filters evidence by keyword', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.type(screen.getByLabelText('搜索证据'), '伸缩线')

    expect(screen.getByText('伸缩线与功率显示已进入现有产品')).toBeInTheDocument()
    expect(screen.queryByText('移动电源必须随身携带')).not.toBeInTheDocument()
  })

  it('runs and resets the local multi-agent review demo', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '开始评审' }))
    expect(screen.getAllByText('用户研究员').length).toBeGreaterThan(0)

    await user.click(screen.getByRole('button', { name: '下一位角色' }))
    expect(screen.getAllByText('竞品分析师').length).toBeGreaterThan(0)
    expect(screen.getByText('已完成结论')).toBeInTheDocument()
    expect(within(screen.getByLabelText('AI Council 多角色评审')).getAllByRole('article')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: '重置评审' }))
    expect(screen.getByRole('button', { name: '开始评审' })).toBeInTheDocument()
  })

  it('guides reviewers through five evidence-first stops', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: '评委 3 分钟导览' }))
    expect(screen.getByText('1 / 5')).toBeInTheDocument()
    expect(scrollIntoView).toHaveBeenLastCalledWith(expect.objectContaining({ block: 'start' }))

    await user.click(screen.getByRole('button', { name: '下一站' }))
    expect(screen.getByText('2 / 5')).toBeInTheDocument()
    expect(scrollIntoView).toHaveBeenCalledTimes(2)

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog', { name: /AI 是否真的运行/ })).not.toBeInTheDocument()
  })

  it('marks the observed section as the current navigation location', () => {
    render(<App />)
    expect(screen.getByRole('link', { name: '方法' })).toHaveAttribute('aria-current', 'location')

    const validation = document.getElementById('validation')!
    act(() => {
      intersectionCallback([
        {
          isIntersecting: true,
          target: validation,
          boundingClientRect: { top: 0 },
        } as unknown as IntersectionObserverEntry,
      ], {} as IntersectionObserver)
    })

    expect(screen.getByRole('link', { name: '验证' })).toHaveAttribute('aria-current', 'location')
  })
})
