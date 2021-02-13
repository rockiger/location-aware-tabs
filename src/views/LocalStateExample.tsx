import React from 'react'
import { Tabs, useTabs } from '../components/Tabs'

const tabs = [
  { id: 1, name: 'Tab 1' },
  { id: 2, name: 'Tab 2' },
  { id: 3, name: 'Tab 3' },
]
export default LocalStateExample
export function LocalStateExample() {
  const { selectedTab, changeTab } = useTabs(tabs[0].id)

  return (
    <>
      <h2>Local State Example</h2>
      <Tabs onClick={changeTab} selectedTab={selectedTab} tabs={tabs} />
    </>
  )
}
