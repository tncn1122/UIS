import thunk from 'redux-thunk'
import { routerMiddleware } from 'connected-react-router'
import { applyMiddleware, compose, createStore } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { createBrowserHistory } from 'history'

// https://github.com/zalmoxisus/redux-devtools-extension
// https://codesandbox.io/s/redux-saga-example-63jj6?file=/index.js
import { composeWithDevTools } from 'redux-devtools-extension'

// https://viblo.asia/p/luu-redux-state-vao-local-storage-voi-redux-persist-3P0lPezv5ox
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import { ENV_LOCAL } from 'config'
import reducers from './reducers'
import rootSagas from './sagas'

// ---------- processing : begin ----------
const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()
const routeMiddleware = routerMiddleware(history)
const middlewares = [thunk, sagaMiddleware, routeMiddleware]
if (process.env.REACT_APP_NODE_ENV === ENV_LOCAL) {
  middlewares.push(logger)
}

// --- Redux persist ---
const persistConfig = {
  key: 'persistStore',
  storage,
  stateReconciler: autoMergeLevel2,
}
/* eslint-disable no-underscore-dangle */
const store = createStore(
  persistReducer(persistConfig, reducers(history)),
  process.env.REACT_APP_NODE_ENV === ENV_LOCAL &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
    ? composeWithDevTools(applyMiddleware(...middlewares))
    : compose(applyMiddleware(...middlewares)),
)
/* eslint-enable */
const persistor = persistStore(store)

// --- run root sagas ---
sagaMiddleware.run(rootSagas)
// ---------- processing: end ----------

export { store, persistor, history }
