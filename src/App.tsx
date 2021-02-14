import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { LocalStateExample } from './views/LocalStateExample'
import { ParameterExample } from './views/ParameterExample'
import { QueryExample } from './views/QueryExample'

import './App.css'

function App() {
  return (
    <Router>
      <QueryClientProvider client={new QueryClient()}>
        <div className="App">
          <Navbar>
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
          </Navbar>
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

const Navbar = styled.nav`
  & ul {
    margin: 0;
    padding: 1rem;
    list-style-type: none;
    text-align: center;
    background-color: steelblue;
  }

  & ul li {
    display: inline;
    margin: 0 1rem;
  }

  & ul li a {
    text-decoration: none;
    padding: 1rem 1rem;
    color: #fff;
    background-color: steelblue;
  }

  & ul li a:hover {
    color: steelblue;
    background-color: #fff;
  }
`
