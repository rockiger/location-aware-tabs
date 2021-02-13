import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from 'react-router-dom'
import { LocalStateExample } from './views/LocalStateExample'
import { ParameterExample } from './views/ParameterExample'
import { QueryExample } from './views/QueryExample'

import './App.css'

export const LocationDisplay = () => {
  const location = useLocation()

  return <div data-testid="location-display">{location.pathname}</div>
}

function App() {
  return (
    <Router>
      <QueryClientProvider client={new QueryClient()}>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Local State Example</Link>
              </li>
              <li>
                <Link to="/param">Parameter Example</Link>
              </li>
              <li>
                <Link to="/query">Query Example</Link>
              </li>
            </ul>
          </nav>
          <LocationDisplay />
          <Switch>
            <Route path="/param">
              <ParameterExample />
            </Route>
            <Route path="/query">
              <QueryExample />
            </Route>
            <Route path="/">
              <LocalStateExample />
            </Route>
          </Switch>
        </div>
      </QueryClientProvider>
    </Router>
  )
}

export default App
