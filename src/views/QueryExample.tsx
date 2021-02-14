import React from 'react'
import { useQuery } from 'react-query'
import { Tabs } from '../components/Tabs/Tabs'

export default QueryExample
export function QueryExample() {
  const { isLoading, error, data: tabNavs } = useQuery('tabsQuery', () =>
    fetch(
      'https://my-json-server.typicode.com/zipprtech/fe-assessment/tabNavs'
    ).then((res) => res.json())
  )

  if (isLoading) return <h2>'Loading...'</h2>

  if (error) return <div>'An error has occurred: ' + error.message</div>

  return (
    <div>
      <h2>Query Example</h2>
      <Tabs
        tabNavs={tabNavs.map((nav) =>
          nav.map(({ id, name }) => ({
            id,
            name,
            Component: () => <div>Query Content {id}</div>,
          }))
        )}
        type="query"
      />
    </div>
  )
}
