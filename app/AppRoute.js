import React, { Fragment } from 'react'
import { Route, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PrivateRoute from './PrivateRoute'

import { Login, Home, Questions } from './routes'

@connect(
  state => ({
    token: state.Main.token,
    userSteamData: state.ApiHOC.root.userData,
  }),
)
@withRouter
export default class AppRoute extends React.Component {
  render() {
    const { token } = this.props

    console.log(`token: ${token}`)
    return (
      <Fragment>
        <PrivateRoute exact path="/" authed={token} component={Home} />
        <Route path="/questions" component={Questions} />
        <Route path="/login" component={Login} />
      </Fragment>
    )
  }
}
