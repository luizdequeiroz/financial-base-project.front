import {
    combineReducers
} from 'redux'

const responses = (state = {}, action) => {
    switch (action.type) {
        case '':
            return action.payload
        default:
            return state
    }
}

/**
 * Importa os reducers
 */
const storeApp = combineReducers({
    responses
})

export default storeApp