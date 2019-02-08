export function post(props, endpoint, returnReduceKey, param, { withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    return {
        props,
        type: 'request',
        method: endpoint,
        methodType: 'POST',
        returnReduceKey,
        param,
        withSuccessedAlert,
        msgSuccessedAlert,
        withWarningAlert,
        msgWarningAlert,
        withFailedAlert,
        msgFailedAlert,
        withErrorAlert,
        msgErrorAlert
    }
}

export function get(props, endpoint, returnReduceKey, { withSuccessedAlert, msgSuccessedAlert, withWarningAlert, msgWarningAlert, withFailedAlert, msgFailedAlert, withErrorAlert, msgErrorAlert }) {
    return {
        props,
        type: 'request',
        method: endpoint,
        methodType: 'GET',
        returnReduceKey,
        withSuccessedAlert,
        msgSuccessedAlert,
        withWarningAlert,
        msgWarningAlert,
        withFailedAlert,
        msgFailedAlert,
        withErrorAlert,
        msgErrorAlert
    }
}