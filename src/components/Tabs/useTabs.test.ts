import { MemoryRouter } from 'react-router-dom'

import { renderHook, act } from '@testing-library/react-hooks'
import { useTabs } from './useTabs'

describe('useTabs without location', () => {
  it('should use tabs', () => {
    const { result } = renderHook(() => useTabs(1))
    expect(result.current.selectedTab).toBe(1)
    expect(typeof result.current.changeTab).toBe('function')
  })

  it('should change selected tab', () => {
    const { result } = renderHook(() => useTabs(1))
    expect(result.current.selectedTab).toBe(1)
    act(() => result.current.changeTab(2))
    expect(result.current.selectedTab).toBe(2)
  })
})

describe('useTabs with parameter', () => {
  it('should use tabs', () => {
    const { result } = renderHook(() => useTabs(1, { type: 'parameter' }), {
      wrapper: MemoryRouter,
    })
    expect(result.current.selectedTab).toBe(1)
    expect(typeof result.current.changeTab).toBe('function')
  })

  it('should change selected tab', () => {
    const { result } = renderHook(() => useTabs(1, { type: 'parameter' }), {
      wrapper: MemoryRouter,
    })
    expect(result.current.selectedTab).toBe(1)
    act(() => result.current.changeTab(2))
    expect(result.current.selectedTab).toBe(2)
  })
})
