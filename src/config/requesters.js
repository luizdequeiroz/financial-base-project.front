import { request } from "./dispatchers"

export function post(props, endpoint, returnReduceKey, param, { withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, param, 'POST', withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return { type: returnReduceKey }
}

export function put(props, endpoint, returnReduceKey, param, { withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, param, 'PUT', withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return { type: returnReduceKey }
}

export function get(props, endpoint, returnReduceKey, { withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, undefined, 'GET', withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return { type: returnReduceKey }
}

export function del(props, endpoint, returnReduceKey, { withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, undefined, 'DELETE', withProccess, msgProccess, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return { type: returnReduceKey }
}