import React, { FC } from 'react'
import styled from 'styled-components/macro'
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
  Redirect,
  useLocation,
} from 'react-router-dom'
import { useTabs } from './useTabs'

export type ITab = {
  /**
   * Name of the tab
   */
  name: string
  id: number
  /**
   * The component to render in the tab panel.
   */
  Component?: FC<{ id: number }>
}

export type ITabs = ITab[]

type TabsProps = {
  /**
   * The part of the path before our parameter. Only need if
   * parameter decides current tab.
   */
  basePath?: string
  /**
   * The default active tab. Is overriden by window location parameters.
   * Assumes > 0
   */
  defaultActiveTab?: number
  /**
   * Orientation of the tabs
   */
  orientation?: 'horizontal' | 'vertical'
  /**
   * The search attribute for the current tab. Only needed if
   * search query decides current tabs
   */
  searchAttributeName?: string
  /**
   * The tabs for a single tab navigation.
   * Needed for parameter or local state tab navigations.
   */
  tabs?: ITabs
  /**
   * The tabs for multiple tab navigation on one page. Needed for search query.
   */
  tabNavs?: ITabs[]
  /**
   * The type of tab navigation
   */
  type?: 'parameter' | 'query'
}

export const Tabs: FC<TabsProps> = (props) => {
  const location = useLocation()
  const { search } = location
  const { path } = useRouteMatch()

  // TODO throw Errors if wrong prop compinations are supplied

  if (props.type === 'parameter') {
    return (
      <Switch>
        <Route path={`${path}/:id`}>
          <RoutedTabs {...props} basePath={path} />
        </Route>
        <Route path={`${path}/`}>
          <Redirect to={`${path}/${props.tabs ? props?.tabs[0]?.id : 1}`} />
        </Route>
      </Switch>
    )
  } else if (props.type === 'query') {
    // open tabs from search if present otherwise create defaults
    if (props.tabNavs?.length && areAllNavsInSearch(props.tabNavs, search)) {
      return (
        <>
          {props.tabNavs?.map((tabs, index) => (
            <RoutedTabs
              key={index}
              defaultActiveTab={props.defaultActiveTab}
              searchAttributeName={`nav${index + 1}`}
              tabs={tabs}
              type="query"
            />
          ))}
        </>
      )
    }
    const searchQuery = compileSearch(props?.tabNavs || [], search)
    return (
      <Redirect to={{ pathname: location.pathname, search: searchQuery }} />
    )
  } else {
    return <RoutedTabs {...props} />
  }
}
export default Tabs

export const RoutedTabs: FC<TabsProps> = ({
  basePath,
  defaultActiveTab,
  orientation = 'horizontal',
  searchAttributeName = '',
  tabs = [],
  type,
}) => {
  const { search } = useLocation()
  const searchParams = new window.URLSearchParams(search)
  const searchAttribute = parseInt(searchParams.get(searchAttributeName) || '')

  const params = useParams<{ id: string }>()
  const parameter = parseInt(params.id)

  const defaultTab = getDefaultTab(
    type,
    parameter,
    searchAttribute,
    tabs,
    defaultActiveTab
  )
  const { selectedTab, changeTab } = useTabs(defaultTab, {
    type,
    basePath,
    searchAttributeName,
  })

  const Panel = tabs && tabs.find((tab) => tab.id === selectedTab)
  const PanelComponent = Panel?.Component || null
  const orientationClass = orientation === 'vertical' ? 'vertical' : ''

  return (
    <TabsComponent className={orientationClass}>
      <TabsList
        className={orientationClass}
        role="tablist"
        aria-orientation={orientation}
      >
        {tabs.map((tab) => (
          <Button
            className={`${
              selectedTab === tab.id ? 'active' : ''
            } ${orientationClass}`}
            onClick={() => changeTab(tab.id)}
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selectedTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            tabIndex={selectedTab === tab.id ? 0 : -1}
            id={`btn-${tab.id}`}
          >
            {tab.name}
          </Button>
        ))}
      </TabsList>
      <TabPanel
        className={orientationClass}
        role="tabpanel"
        aria-labelledby={`btn-${selectedTab}`}
        id={`tabpanel-${selectedTab}`}
      >
        {PanelComponent && <PanelComponent id={selectedTab} />}
      </TabPanel>
    </TabsComponent>
  )
}

/**********
 * Helper *
 **********/

/**
 * Determines if all tab navigations are represented in the
 * current search query.
 */

function areAllNavsInSearch(navs: ITabs[], search: string) {
  const searchParams = new window.URLSearchParams(search)
  const navNames = navs.map((el, index) => `nav${index + 1}`)
  const result = navNames.every((el) => searchParams.get(el))
  return result
}

/**
 * Compiles a new query for the given tab navigations and the give
 * search query.
 */
function compileSearch(navs: ITabs[], search: string) {
  const searchParams = new window.URLSearchParams(search)
  navs.forEach((tabs, index) =>
    searchParams.set(`nav${index + 1}`, (tabs[0]?.id || 1).toString())
  )
  return `?${searchParams.toString()}`
}

/**
 * Choose a default tab for the given parameters.
 */
function getDefaultTab(
  type,
  parameter,
  searchAttribute,
  tabs,
  defaultActiveTab
) {
  if (type === 'parameter') {
    return parameter || tabs[0]?.id || 1
  } else if (type === 'query') {
    return searchAttribute || tabs[0]?.id || 1
  }
  return defaultActiveTab || tabs[0]?.id || 1
}

/*********************
 * Styled Components *
 *********************/

const TabsComponent = styled.div`
  padding-bottom: 2rem;
  &.vertical {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
  }
`

const TabsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-bottom: 1px solid #dee2e6;
  position: relative;
  &.vertical {
    flex-direction: column;
  }
`

const Button = styled.button`
  border-width: 1px;
  border-style: solid;
  border-color: transparent;

  display: block;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin: 0;
  outline: none;
  background-color: #fff;
  transition: border 0.2s ease-in-out 0s;

  &.active,
  &:hover,
  &:focus {
    border-width: 1px;
    border-color: #e9ecef #e9ecef #b41c1c;
  }

  &.active.vertical,
  &:hover.vertical,
  &:focus.vertical {
    border-width: 1px;
    border-color: #e9ecef #e9ecef #b41c1c;
  }

  &.active {
    color: #495057;
    background-color: #f8f8f8;
  }
`
const TabPanel = styled.div`
  align-items: center;
  background-color: #f8f8f8;
  box-shadow: 1px 1px 2px rgb(204 204 204 / 75%);
  display: flex;
  font-size: 1.5rem;
  justify-content: center;
  min-height: 100px;
  padding: 1rem;
  text-align: left;
  &.vertical {
    flex: 1;
  }
`
