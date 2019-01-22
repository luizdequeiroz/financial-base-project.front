import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import reducers from '../reducers'
import { reducer as formReducer } from 'redux-form'

// Inicialização da Store do Redux
export default function configureStore(middleware) {
  const store = createStore(
      combineReducers({
        reducers,
        routing: routerReducer,
        form: formReducer
      }),
      applyMiddleware(middleware)
    )

  if (module.hot) {
    module.hot.accept('../reducers', () => 
      store.replaceReducer(require('../reducers').default)
    )
  } 
  return store
}
