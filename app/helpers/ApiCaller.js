import axios from 'axios'
import config from '../config'

const methods = ['get', 'post', 'put', 'delete']

/**
 * prepend slash and api base url to given url/path
 */
function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path
  return (config.apiUrl + adjustedPath)
}

function getToken() {
  const store = localStorage.getItem('persist:root')

  try {
    const { Main } = JSON.parse(store)
    const { token } = JSON.parse(Main)

    return token
  } catch (e) {
    // console.error(e)
  }

  return null
}

/**
 * create fetch instance based on method
 */
function fetchCreator(method) {
  return (url, { data, service, getCancelSource, ...options } = {}) => {
    const fetchOptions = options

    fetchOptions.headers = fetchOptions.headers || {}
    fetchOptions.headers.Accept = 'application/json'
    fetchOptions.headers.session = getToken()

    if (getCancelSource) {
      const { CancelToken } = axios
      const source = CancelToken.source()
      getCancelSource(source)

      fetchOptions.cancelToken = source.token
    }

    if (data) {
      fetchOptions.data = JSON.stringify(data)
      fetchOptions.headers['Content-Type'] = 'application/json'
    }

    fetchOptions.method = method
    fetchOptions.url = formatUrl(url, service)

    console.log('REQUEST =======>>>>>>')
    console.log(formatUrl(url), fetchOptions)
    return axios(fetchOptions)
      .then((response) => {
        console.log(`${formatUrl(url)} RESPONSE =========>>>`, response.data.data)
        return response.data.data
      })
  }
}

export default class ApiCaller {
  constructor() {
    methods.forEach((method) => {
      this[method] = fetchCreator(method)
    })
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * 'ApiClient is not defined' from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  // eslint-disable-next-line class-methods-use-this
  empty() {
    //
  }
}
