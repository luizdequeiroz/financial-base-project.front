import { fetchDedupe, getRequestKey } from 'fetch-dedupe'
import swal from 'sweetalert2'

const API = process.env.REACT_APP_API_DEVELOP

/**
 * Função que armazena um valor em um reducer cuja key foi especificada.
 * @param {string} returnReduceKey key de reduce na qual deve ser aplicado o valor.
 * @param {any} value valor a ser aplicado na key especificada.
 */
export function setValue(props, returnReduceKey, value) {
    const { dispatch } = props

    dispatch({ type: returnReduceKey, payload: value })
}

/**
 * Função que limpa os valores no reducer.
 */
export function clearValues(props) {
    const { dispatch } = props

    dispatch({ type: 'clearAll' })
}

/**
 * Função de consumo de API que trás retorno para o reducer.
 * @param {any} props propriedades do componente que está a acionar a requisição.
 * @param {string} method assinatura do método da API que será concatenado com a url da API definida (sugestão: use alias).
 * @param {string} returnReduceKey key de reduce na qual deve ser aplicado o retorno da solicitação da API.
 * @param {any} param parâmetros da requisição.
 * @param {string} methodType tipo de método de requisição (GET ou POST).
 * @param {boolean} withSuccessedAlert indica se a solicitação acionará um modal de sucesso quando a mesma for bem sucedida.
 * @param {boolean} withWarningAlert indica se a solicitação acionará um modal de aviso quando a mesma receber da API algum tratamento inesperado.
 * @param {boolean} withFailedAlert indica se a solicitação acionará um modal de falha quando a mesma falhar na API (erro tratado na API).
 * @param {boolean} withErrorAlert indica se a solicitação acionará um modal de erro quando a mesma errar por alguma razão ao comunicar-se com a API.
 */
export function request(props, method, returnReduceKey, param = '', methodType = 'GET', withSuccessedAlert = false, msgSuccessedAlert, withWarningAlert = false, msgWarningAlert, withFailedAlert = false, msgFailedAlert = 'Revalide a sessão para continuar usando o sistema.', withErrorAlert = false, msgErrorAlert) {

    var init = {
        method: methodType,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('session') !== null ? JSON.parse(sessionStorage.getItem('session')).token : ''}`
        }
    }

    if (methodType === 'POST')
        init = { ...init, body: JSON.stringify(param) }

    const url = `${API}/${method}`

    const requestKey = getRequestKey({ url, method: methodType, body: methodType === 'POST' ? JSON.stringify(param) : undefined });
    const dedupeOptions = { requestKey }

    fetchDedupe(url, init, dedupeOptions).then(response => {
        if (response.ok) {
            if (response.status === 200)
                return response.data
            else if (response.status === 401) {
                if (window.location.hash === '#/') {
                    sessionStorage.clear()
                    setValue(props, 'session')
                }
                window.location.hash = '#'
                if (withFailedAlert) swal('Sessão inválida ou expirada!', msgFailedAlert, 'info')
            }
        } else {
            throw new Error(JSON.stringify(response))
        }
    }).then(json => {
        setValue(props, returnReduceKey, json)
        if (json.status < 0) {
            if (withWarningAlert) swal(json.message, msgWarningAlert, 'warning')

            console.error(json.message)
        } else {

            if (withSuccessedAlert) swal(json.message, msgSuccessedAlert, 'success')
        }
    }).catch((error) => {
        setValue(props, returnReduceKey, undefined)

        if (withErrorAlert) swal(error.message, msgErrorAlert, 'error')
    })
}