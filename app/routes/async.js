import React from 'react'
import Loading from 'common/Loading'

// `path` should be relative to the `components/` folder
const loadComponentAsync = path => (
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        Component: null,
        error: null,
      }
    }

    componentDidMount() {
      // Name a chunk via webpack's magic comment
      import(/* webpackChunkName: '[request]' */ `components/${path}/${path}`)
        .then(mod => {
          if (mod.default) {
            return mod.default
          }

          return mod
        })
        .then((Component) => {
          this.setState({ Component })
        })
        .catch(error => {
          console.error('cs error', error)
          this.setState({ error })
        })
    }

    render() {
      const { Component } = this.state

      return Component
        ? <Component {...this.props} />
        : <Loading error={this.state.error} />
    }
  }
)

export default loadComponentAsync
