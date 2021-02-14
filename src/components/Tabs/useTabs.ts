import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'

/**
 * React Hook based on useState, that changes the window location
 * accordingly to the type of the tab navigation and to the current location.
 */
export function useTabs(
  defaultTabId = 1,
  options: {
    basePath?: string
    searchAttributeName?: string
    type?: 'parameter' | 'query'
  } = {}
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
      if (options.type === 'query' && options.searchAttributeName) {
        const pathname = history.location.pathname
        const searchParams = new window.URLSearchParams(history.location.search)
        searchParams.set(options.searchAttributeName, tabId)
        const searchQuery = `?${searchParams.toString()}`
        history.push({ pathname: pathname, search: searchQuery })
      }
    },
    [history, options]
  )
  return { selectedTab, changeTab }
}
