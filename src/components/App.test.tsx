import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('product lab application', () => {
  it('renders the evidence-to-product narrative and disclosures', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', {
        name: /当移动电源在旅途中必须可见、可接触、可判断/,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByText(/独立参赛项目/).length).toBeGreaterThan(0)
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

    await user.click(screen.getByRole('button', { name: '重置评审' }))
    expect(screen.getByRole('button', { name: '开始评审' })).toBeInTheDocument()
  })
})
