import 'react-app-polyfill/ie11'
import React from 'react'
import { Switch } from 'react-router-dom'

import FancyRoute from './components/FancyRoute'

import routes from './lib/routes'

function App() {
  return (
    <>
      <Switch>
        {routes.map((route, i) => (
          <FancyRoute key={i} {...route} />
        ))}
      </Switch>
    </>
  )
}

export default App
