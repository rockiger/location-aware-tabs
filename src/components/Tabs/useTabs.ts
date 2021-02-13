import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

export function useTabs(
  defaultTabId = 1,
  options: { type?: 'parameter' | 'query' }
) {
  const [selectedTab, setSelectedTab] = useState(defaultTabId)
  const history = useHistory()
  const changeTab = useCallback(
    (tabId) => {
      setSelectedTab(tabId)
      history.push(`/param/${tabId}`)
    },
    [history]
  )
  return { selectedTab, changeTab }
}
