import { request } from "./dispatchers"

export function post(props, endpoint, returnReduceKey, param, { withProccessAlert, msgProccessAlert, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, param, 'POST', withProccessAlert, msgProccessAlert, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return {}
}

export function get(props, endpoint, returnReduceKey, { withProccessAlert, msgProccessAlert, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    request(props, endpoint, returnReduceKey, undefined, 'GET', withProccessAlert, msgProccessAlert, withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert)
    return {}
}