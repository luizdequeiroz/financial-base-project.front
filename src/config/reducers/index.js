import {
    combineReducers
} from 'redux'
import { request } from '../dispatchers'

const responses = (state = {}, action) => {
    const {
        props,
        method,
        returnReduceKey,
        param,
        methodType,
        withSuccessedAlert,
        msgSuccessedAlert,
        withWarningAlert,
        msgWarningAlert,
        withFailedAlert,
        msgFailedAlert,
        withErrorAlert,
        msgErrorAlert
    } = action

    switch (action.type) {
        case 'request':
            request(props, method, returnReduceKey, param, methodType, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
            return action
        case 'GENERIC_RETURN':
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