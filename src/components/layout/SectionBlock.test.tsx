import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SectionBlock } from './SectionBlock'

const renderBlock = (props: Partial<Parameters<typeof SectionBlock>[0]> = {}) =>
  render(
    <SectionBlock
      id="dashboard"
      index="01"
      fileName="01_dashboard.lua"
      startLine={10}
      lineCount={5}
      isActive={false}
      {...props}
    >
      <p>block content</p>
    </SectionBlock>,
  )

describe('SectionBlock', () => {
  it('renders children and the file name', () => {
    renderBlock()
    expect(screen.getByText('block content')).toBeInTheDocument()
    expect(screen.getByText('01_dashboard.lua')).toBeInTheDocument()
  })

  it('renders exactly lineCount gutter numbers starting at startLine', () => {
    const { container } = renderBlock({ startLine: 10, lineCount: 5 })
    const gutter = container.querySelector('section > div:nth-child(2) > div:first-child')
    const numbers = Array.from(gutter?.querySelectorAll('span') ?? [])
    expect(numbers).toHaveLength(5)
    expect(numbers.map((n) => n.textContent)).toEqual(['10', '11', '12', '13', '14'])
  })

  it('applies the mauve class to the file name and highlights the first line when active', () => {
    renderBlock({ isActive: true, startLine: 10 })
    expect(screen.getByText('01_dashboard.lua')).toHaveClass('text-ctp-mauve', 'font-bold')
    expect(screen.getByText('10')).toHaveClass('text-ctp-teal', 'font-bold')
    expect(screen.getByText('11')).not.toHaveClass('text-ctp-teal')
  })

  it('uses neutral overlay styling when inactive', () => {
    renderBlock({ isActive: false, startLine: 10 })
    expect(screen.getByText('01_dashboard.lua')).toHaveClass('text-ctp-overlay')
    expect(screen.getByText('10')).not.toHaveClass('font-bold')
  })
})
