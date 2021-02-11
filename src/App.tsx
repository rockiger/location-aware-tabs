import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { LocalStateExample } from './views/LocalStateExample'
import { ParameterExample } from './views/ParameterExample'
import { QueryExample } from './views/QueryExample'

import './App.css'
function App() {
  return (
    <Router>
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
    </Router>
  )
}

export default App
