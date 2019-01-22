import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { persistState } from 'redux-devtools'
import reducers from '../reducers'
import DevTools from '../containers/DevTools'
import { reducer as formReducer } from 'redux-form'

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
  const store = createStore(
      combineReducers({
        reducers,
        routing: routerReducer,
        form: formReducer
      }),
      enhancer,
      applyMiddleware(middleware)
    )

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    )
  }
  return store
}
