import React, { FC } from 'react'
import styled from 'styled-components/macro'
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
  Redirect,
} from 'react-router-dom'
import { useTabs } from './useTabs'

export type ITab = {
  name: string
  id: number
  Component?: FC<{ id: number }>
}

export type ITabs = ITab[]

type TabsProps = {
  orientation?: 'horizontal' | 'vertical'
  tabs: ITabs
  type?: 'parameter' | 'query'
}

export const Tabs: FC<TabsProps> = (props) => {
  let match = useRouteMatch()
  if (props.type) {
    return (
      <Switch>
        <Route path={`${match.path}/:id`}>
          <RoutedTabs {...props} />
        </Route>
        <Route path={`${match.path}/`}>
          <RoutedTabs {...props} />
        </Route>
      </Switch>
    )
  } else {
    return <RoutedTabs {...props} />
  }
}
export const RoutedTabs: FC<TabsProps> = ({
  tabs = [],
  orientation = 'horizontal',
  type,
}) => {
  const { selectedTab, changeTab } = useTabs(1, { type })

  const Panel = tabs && tabs.find((tab) => tab.id === selectedTab)
  const PanelComponent = Panel?.Component || null
  const orientationClass = orientation === 'vertical' ? 'vertical' : ''

  const params = useParams<{ id: string }>()
  const parameter = parseInt(params.id)

  if (type && parameter !== selectedTab) {
    return <Redirect to="/param/1" />
  }

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
export default RoutedTabs

const TabsComponent = styled.div`
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
  text-align: left;
  padding: 1rem;
  background-color: #f8f8f8;
  box-shadow: 1px 1px 2px rgb(204 204 204 / 75%);
  &.vertical {
    flex: 1;
  }
`
