import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import isBrowser from 'app/helpers/isBrowser'
import reducers from './reducers'
import ApiCaller from '../helpers/ApiCaller'

const thunkMiddleware = thunk.withExtraArgument(new ApiCaller())

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (isBrowser && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(
    thunkMiddleware,
  )),
)

const persistor = persistStore(store)

export {
  store,
  persistor,
}
