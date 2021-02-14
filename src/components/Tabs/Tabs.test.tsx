import React from 'react'

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'

import { Tabs } from './Tabs'

const leftClick = { button: 0 }
export const ParamDisplay = () => {
  const location = useLocation()
  return <div data-testid="pathname-display">{location.pathname}</div>
}

export const SearchDisplay = () => {
  const location = useLocation()
  return <div data-testid="search-display">{location.search}</div>
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

const queryTabs = [
  [
    {
      name: 'Tab 4',
      id: 4,
      Component: () => <div>Query Content 4</div>,
    },
    {
      name: 'Tab 5',
      id: 5,
      Component: () => <div>Query Content 5</div>,
    },
    {
      name: 'Tab 6',
      id: 6,
      Component: () => <div>Query Content 6</div>,
    },
  ],
  [
    {
      name: 'Tab 7',
      id: 7,
      Component: () => <div>Query Content 7</div>,
    },
    {
      name: 'Tab 8',
      id: 9,
      Component: () => <div>Query Content 9</div>,
    },
    {
      name: 'Tab 10',
      id: 10,
      Component: () => <div>Query Content 10</div>,
    },
  ],
  [
    {
      name: 'Tab 11',
      id: 11,
      Component: () => <div>Query Content 11</div>,
    },
    {
      name: 'Tab 12',
      id: 12,
      Component: () => <div>Query Content 12</div>,
    },
    {
      name: 'Tab 13',
      id: 13,
      Component: () => <div>Query Content 13</div>,
    },
  ],
]
test('search query', () => {
  render(
    <div>
      <Tabs tabNavs={queryTabs} type="query" />
      <SearchDisplay />
    </div>,
    { wrapper: MemoryRouter }
  )
  expect(screen.getByText('Query Content 4')).toBeInTheDocument()
  expect(screen.getByText('Query Content 7')).toBeInTheDocument()
  expect(screen.getByText('Query Content 11')).toBeInTheDocument()
  expect(screen.getByText('?nav1=4&nav2=7&nav3=11')).toBeInTheDocument()
  userEvent.click(screen.getByText('Tab 5'), leftClick)
  userEvent.click(screen.getByText('Tab 8'), leftClick)
  userEvent.click(screen.getByText('Tab 13'), leftClick)
  expect(screen.getByText('?nav1=5&nav2=9&nav3=13')).toBeInTheDocument()
  expect(screen.getByText('Query Content 5')).toBeInTheDocument()
  expect(screen.getByText('Query Content 9')).toBeInTheDocument()
  expect(screen.getByText('Query Content 13')).toBeInTheDocument()
})
