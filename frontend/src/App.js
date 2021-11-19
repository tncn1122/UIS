import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor, history } from 'redux/store'
import { Localization, InitialCheck } from 'component'
import AppRouter from 'AppRouter'
import 'style/global.scss'
import 'antd/dist/antd.css'
// import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<div>Loading</div>} persistor={persistor}>
      <InitialCheck>
        <Localization>
          <AppRouter history={history} />
        </Localization>
      </InitialCheck>
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
)

// serviceWorker.register()
