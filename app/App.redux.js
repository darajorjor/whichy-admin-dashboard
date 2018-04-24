const SET_AUTHENTICATION = 'ltp/app/SET_AUTHENTICATION'
const LOGOUT = 'ltp/app/LOGOUT'
const LOAD = 'ltp/app/LOAD'

const initialState = {
  token: null,
  loading: false,
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATION:
      return {
        ...state,
        token: action.data,
      }
    case LOGOUT:
      return {
        ...state,
        token: null,
      }
    case LOAD:
      return {
        ...state,
        loading: action.data === 100 ? false : action.data,
      }
    default:
      return state
  }
}

export function setAuthentication(data) {
  return {
    type: SET_AUTHENTICATION,
    data,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}
