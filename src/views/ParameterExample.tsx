import React from 'react'

import { useQuery } from 'react-query'
import { Tabs } from '../components/Tabs/Tabs'

export default ParameterExample
export function ParameterExample() {
  const { isLoading, error, data: tabs } = useQuery('tabsParam', () =>
    fetch(
      'https://my-json-server.typicode.com/zipprtech/fe-assessment/tabNav'
    ).then((res) => res.json())
  )

  if (isLoading) return <div>'Loading...'</div>

  if (error) return <div>'An error has occurred: ' + error.message</div>

  return (
    <div>
      <h2>Parameter Example</h2>
      <Tabs
        tabs={tabs.map(({ id, name }) => ({
          id,
          name,
          Component: () => <div>Param Content {id}</div>,
        }))}
        type="parameter"
      />
    </div>
  )
}
