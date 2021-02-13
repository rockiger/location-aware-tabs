import React from 'react'
import { RoutedTabs } from '../components/Tabs/Tabs'

const tabs = [
  { id: 1, name: 'Tab 1' },
  { id: 2, name: 'Tab 2' },
  { id: 3, name: 'Tab 3' },
]
export default LocalStateExample
export function LocalStateExample() {
  return (
    <>
      <h2>Local State Example</h2>
      <RoutedTabs tabs={tabs} />
    </>
  )
}
