/* eslint-disable compat/compat */
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import isBrowser from 'app/helpers/isBrowser'

import App from './App'

// eslint-disable-next-line consistent-return
const render = Component => {
  if (!isBrowser) return null
  ReactDOM.render(
    <AppContainer>
      <Router>
        <Component />
      </Router>
    </AppContainer>,
    document.getElementById('app'),
  )
}

if (process.env.NODE_ENV === 'production' && isBrowser) {
  window.onload = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
  }
}

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}

render(App)
