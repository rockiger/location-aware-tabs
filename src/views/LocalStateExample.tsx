import React from 'react'
import { Tabs } from '../components/Tabs/Tabs'

const tabs = [
  { id: 1, name: 'Tab 1', Component: () => <div>Local Content 1</div> },
  { id: 2, name: 'Tab 2', Component: () => <div>Local Content 2</div> },
  { id: 3, name: 'Tab 3', Component: () => <div>Local Content 3</div> },
]
export default LocalStateExample
export function LocalStateExample() {
  return (
    <>
      <h2>Local State Example</h2>
      <Tabs tabs={tabs} />
    </>
  )
}
