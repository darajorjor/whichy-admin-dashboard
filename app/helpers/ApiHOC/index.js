/* eslint-disable no-shadow,react/no-unused-state,prefer-destructuring */
import React from 'react'
import Qs from 'qs'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { setToStore } from './redux'
import ApiCaller from '../ApiCaller'
import { setAuthentication } from '../../App.redux'

const callApi = new ApiCaller()

const api = (ops, additionalConfig) => {
  let name = ops.name
  if (additionalConfig && additionalConfig.name) {
    name = additionalConfig.name
  }

  return (Comp) => {
    @connect(
      state => ({
        [name]: state.ApiHOC.root[name],
      }),
      { setToStore, setAuthentication },
      null,
      { withRef: true },
    )
    class ApiHOC extends React.Component {
      constructor(props) {
        super(props)
        let url
        let service
        let method
        let name
        let query
        let options

        // debugger
        if (typeof ops === 'function') {
          const data = Object.assign({}, ops(props), additionalConfig)
          url = data.url
          service = data.service
          method = data.method
          name = data.name
          query = data.query
          options = Object.assign({}, { instantCall: true, caching: true }, data.options)
        } else {
          url = ops.url
          service = ops.service
          method = ops.method
          name = ops.name
          query = ops.query
          options = Object.assign({}, { instantCall: true, caching: true }, ops.options)
        }
        // debugger
        method = method.toUpperCase()

        this.url = url
        this.service = service
        this.method = method
        this.name = name
        this.query = query
        this.options = options

        this.apiInstance = null
        this.state = {
          loading: false,
          error: null,
          data: null,
        }
      }

      componentDidMount() {
        this.call = this.call.bind(this.call)

        if (this.method === 'GET' && this.options.instantCall) {
          this.call({ query: this.query })
        }
      }

      componentWillUnmount() {
        if (this.apiInstance) {
          this.apiInstance.cancel()
        }
      }

      getData = () => {
        const { data: stateData, loading, error } = this.state
        const { [this.name]: data, setToStore } = this.props

        const result = Object.assign({}, this.props.data, {
          [`${this.name}Loading`]: loading,
          [`${this.name}Error`]: error,
          [this.name]: this.options.caching ? data : stateData,
          mutateStore: setToStore,
        })

        if (this.method === 'GET') {
          result[`${this.name}Refetch`] = this.call
        } else {
          result[this.name] = this.call
        }

        return result
      }

      asyncSetState = async state => new Promise(res => this.setState(state, res))

      call = async ({ query, body } = {}) => {
        const {
          // setAuthentication,
          setToStore,
        } = this.props

        await this.asyncSetState({
          loading: true,
          error: null,
        })

        try {
          const progressHandler = (progressEvent) => {
            /**
             * Progress. Disabled for performance purposes
             * */
            if (progressEvent.lengthComputable) {
              // eslint-disable-next-line max-len
              // const percentCompleted = Math.floor((progressEvent.loaded * 100) / progressEvent.total)

              // console.log('percentCompleted ', percentCompleted)
              // this.setState({
              //   loading: percentCompleted,
              // })
            }
          }
          const data = await callApi[this.method.toLowerCase()](`${this.url}/${((query || this.query) ? `?${Qs.stringify((query || this.query))}` : '')}`, {
            data: body,
            service: this.service,
            getCancelSource: source => this.apiInstance = source,
            onDownloadProgress: progressHandler,
            onUploadProgress: progressHandler,
          })

          if (this.options.caching) {
            setToStore(`${this.name}`, data)
          }

          await this.asyncSetState({
            data,
            loading: false,
            error: null,
          })

          return data
        } catch (data) {
          let { message } = data
          const { response } = data

          if (response && response.data && response.data.message) {
            message = response.data.message

            this.handleError(message)
          } else {
            toast.error('OOPS! SOMETHING WENT WRONG...')
          }

          /* if (response && response.status === 401) {
            setAuthentication(null)
          } */

          await this.asyncSetState({
            loading: false,
            error: message,
          })

          throw message
        }
      }

      /* eslint-disable */
      handleError(message) {
        let title
        let subtitle

        switch (message) {
          case 'not_enough_balance':
            title = 'notEnoughBalanceTitle'
            subtitle = 'notEnoughBalanceSubTitle'
            break
          case 'has_active_deposit':
            return null
          default:
          //
        }

        toast.error(title)

        return null
      }

      getWrappedInstance() { // called from outside
        return this.refInstance
      }

      render() {
        return (
          <Comp
            ref={ref => this.refInstance = ref}
            {...this.props}
            data={this.getData()}
          >
            {this.props.children}
          </Comp>
        )
      }
    }

    return ApiHOC
  }
}
export default api