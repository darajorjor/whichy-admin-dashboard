/* eslint-disable no-shadow,no-nested-ternary */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line max-len
const getLoadingComponent = ({ delay = 200, timeout = 5000, LoadingComponent = () => null, TimeoutComponent = () => null, ErrorComponent = () => null } = {}) => {
  class Loading extends Component {
    constructor(props) {
      super(props)

      this.state = {
        timedOut: false,
        LoadingComponent: () => null,
      }
    }

    componentDidMount() {
      this.delayTimer = setTimeout(() => {
        this.setState({ LoadingComponent })
      }, delay)

      this.timeoutTimer = setTimeout(() => {
        this.setState({ timedOut: true })
      }, timeout)
    }

    componentWillUnmount() {
      clearTimeout(this.delayTimer)
      clearTimeout(this.timeoutTimer)
    }

    render() {
      const { LoadingComponent, timedOut } = this.state
      const { error } = this.props

      return error
        ? <ErrorComponent error={error} />
        : timedOut
          ? <TimeoutComponent />
          : <LoadingComponent />
    }
  }

  Loading.propTypes = {
    error: PropTypes.object,
  }

  Loading.defaultProps = {
    error: null,
  }

  return Loading
}

export default getLoadingComponent
