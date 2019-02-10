import { combineReducers } from 'redux'

function reducerKeys(state = {}, action) {

    switch (action.type) {
        case 'session':
        case 'clients':
            const value = {}
            value[action.type] = action.payload || {}
            return {
                ...state,
                ...value
            }
        default:
            return state
    }
}

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    reducerKeys
})
export default storeApp