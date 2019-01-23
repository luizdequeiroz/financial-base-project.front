import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import reducers from '../reducers'
import DevTools from '../containers/DevTools'
import { reducer as form } from 'redux-form'
import multi from 'redux-multi'

const enhancer = compose(
  DevTools.instrument(),
  persistState(
    window.location.href.match(
      /[?&]debug_session=([^&#]+)\b/
    )
  )
)

// Inicialização da Store do Redux
export default function configureStore(middleware) {
  const store = applyMiddleware(middleware, multi)(createStore)(
    combineReducers({ reducers, form, routing }),
    enhancer,
  )

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }

  return store
}