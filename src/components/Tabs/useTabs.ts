import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

export function useTabs(
  defaultTabId = 1,
  options: { type?: 'parameter' | 'query'; basePath?: string } = {}
) {
  const [selectedTab, setSelectedTab] = useState(defaultTabId)
  const history = useHistory()
  const changeTab = useCallback(
    (tabId) => {
      setSelectedTab(tabId)
      // eslint-disable-next-line eqeqeq
      if (options.type === 'parameter' && options.basePath != undefined) {
        history.push(`${options.basePath}/${tabId}`)
      }
    },
    [history, options]
  )
  return { selectedTab, changeTab }
}
