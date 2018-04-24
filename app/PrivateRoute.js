/* eslint-disable */
import React, { Fragment, Component } from 'react'
import { withRouter, Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authed ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
)


export default PrivateRoute

