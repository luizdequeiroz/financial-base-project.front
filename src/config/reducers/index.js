import { combineReducers } from 'redux'

const initialState = {}

function reducerKeys(state = initialState, action) {

    switch (action.type) {
        case 'session':
        case 'loading':
        case 'clients':
        case 'client':
        case 'csvFile':
        case 'loans':
        case 'loan':
            const value = {}
            value[action.type] = action.payload || {}
            return {
                ...state,
                ...value
            }
        case 'clearAll':
            return initialState
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