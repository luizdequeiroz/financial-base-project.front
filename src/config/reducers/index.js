import {
    combineReducers
} from 'redux'
import { request } from '../dispatchers'

const responses = (state = {}, action) => {

    switch (action.type) {
        case 'request':
            request(action.props, action.method, action.returnReduceKey, action.param, action.methodType)
            return action
        case 'GENERIC_RETURN':
            return action.data
        default:
            return state
    }
}

/**
 * Importa os reducers
 */
const storeApp = combineReducers({ responses })
export default storeApp