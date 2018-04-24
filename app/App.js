import React from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import CssBaseline from 'material-ui/CssBaseline'
import { MuiThemeProvider } from 'material-ui/styles'
import { ToastContainer, toast } from 'react-toastify'
import { PersistGate } from 'redux-persist/lib/integration/react'

import AppRoute from './AppRoute'
import { store, persistor } from './redux/store'
import theme from './theme'

import './assets/styles/index.scss'

global.toast = toast

/* eslint-disable */
@withRouter
export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <PersistGate persistor={persistor}>
          <Provider store={store}>
            <main>
              <CssBaseline />
              <Switch>
                <AppRoute />
              </Switch>
            </main>
          </Provider>
        </PersistGate>
        <ToastContainer />
      </MuiThemeProvider>
    )
  }
}
