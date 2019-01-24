import {
    combineReducers
} from 'redux'
import { request, setValue, clearValues } from '../dispatchers'

const responses = (state = {}, action) => {
    const { props, method, returnReduceKey, param, methodType, withSuccessedModal, withWarningModal, withFailedModal, withErrorModal, value } = action

    switch (action.type) {
        case 'request':
            request(props, method, returnReduceKey, param, methodType, withSuccessedModal, withWarningModal, withFailedModal, withErrorModal)
            return action
        case 'setValue':
            setValue(props, returnReduceKey, value)
            return action
        case 'clearValues':
            clearValues(props)
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