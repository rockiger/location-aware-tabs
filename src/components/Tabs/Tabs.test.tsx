//@ts-ignore
import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import { Tabs } from './Tabs'

const leftClick = { button: 0 }
export const ParamDisplay = () => {
  const location = useLocation()
  return <div data-testid="location-display">{location.pathname}</div>
}

const localTabs = [
  { id: 1, name: 'Tab 1', Component: () => <div>Local Content 1</div> },
  { id: 2, name: 'Tab 2', Component: () => <div>Local Content 2</div> },
  { id: 3, name: 'Tab 3', Component: () => <div>Local Content 3</div> },
]
test('local state', () => {
  render(<Tabs tabs={localTabs} />, { wrapper: MemoryRouter })
  expect(screen.getByText('Local Content 1')).toBeInTheDocument()
  userEvent.click(screen.getByText('Tab 2'), leftClick)
  expect(screen.getByText('Local Content 2')).toBeInTheDocument()
})

const paramTabs = [
  { id: 1, name: 'Tab 1', Component: () => <div>Param Content 1</div> },
  { id: 2, name: 'Tab 2', Component: () => <div>Param Content 2</div> },
  { id: 3, name: 'Tab 3', Component: () => <div>Parma Content 3</div> },
]
test('parameter', () => {
  render(
    <div>
      <Tabs tabs={paramTabs} type="parameter" />
      <ParamDisplay />
    </div>,
    { wrapper: MemoryRouter }
  )
  expect(screen.getByText('Param Content 1')).toBeInTheDocument()
  expect(screen.getByText('//1')).toBeInTheDocument()
  userEvent.click(screen.getByText('Tab 2'), leftClick)
  expect(screen.getByText('//2')).toBeInTheDocument()
  expect(screen.getByText('Param Content 2')).toBeInTheDocument()
})
