import { request } from "./dispatchers"

export function post(props, endpoint, returnReduceKey, param, { withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, param, 'POST', withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return {}
}

export function get(props, endpoint, returnReduceKey, { withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, undefined, 'GET', withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return {}
}