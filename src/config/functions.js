/**
 * Função que armazena um valor em um reducer cuja key foi especificada.
 * @param {string} returnReduceKey key de reduce na qual deve ser aplicado o valor.
 * @param {any} value valor a ser aplicado na key especificada.
 */
export function setReducer(returnReduceKey, value) {
    const { props: { dispatch, responses } } = this

    responses[returnReduceKey] = value
    dispatch({ type: GENERIC_RETURN, data: { ...responses } })
}

/**
 * Função que limpa o reducer.
 */
export function clearReducer() {
    const { props: { dispatch } } = this

    dispatch({ type: GENERIC_RETURN, data: {} })
}

/**
 * Função de consumo de API que trás retorno para o reducer.
 * @param {string} method assinatura do método da API que será concatenado com a url da API definida (sugestão: use alias).
 * @param {string} returnReduceKey key de reduce na qual deve ser aplicado o retorno da solicitação da API.
 * @param {any} param parâmetros da requisição.
 * @param {string} methodType tipo de método de requisição (GET ou POST).
 * @param {boolean} withProgressModal indica se a solicitação acionará um modal de carregamento enquanto a mesma é processada.
 * @param {boolean} withSuccessedModal indica se a solicitação acionará um modal de sucesso quando a mesma for bem sucedida.
 * @param {boolean} withFailedModal indica se a solicitação acionará um modal de falha quando a mesma falhar na API (erro tratado na API).
 * @param {boolean} withErrorModal indica se a solicitação acionará um modal de erro quando a mesma errar por alguma razão ao comunicar-se com a API.
 */
export function request(method, returnReduceKey, param = '', methodType = 'GET', withProgressModal = false, withSuccessedModal = false, withWarningModal = false, withFailedModal = false, withErrorModal = false) {
    const { props: { dispatch, responses } } = this

    var init = {
        method: methodType,
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem(session) !== null ? JSON.parse(sessionStorage.getItem(session)).token : ''}`
        }
    }

    if (methodType === 'POST')
        init = { ...init, body: JSON.stringify(param) }

    const url = `${API}/${method}/${methodType === 'GET' ? param : ''}`

    const requestKey = getRequestKey({ url, method: methodType, body: methodType === 'POST' ? JSON.stringify(param) : undefined });
    const dedupeOptions = { requestKey }

    fetchDedupe(url, init, dedupeOptions).then(response => {
        if (response.ok) {
            if (response.status === 200)
                return response.data
            else if (response.status === 401) {
                if (window.location.hash === '#/') {
                    sessionStorage.clear()
                    clearReducer()
                }
                window.location.hash = '#'
                swal() // TODO: warning
            }
        } else {
            throw new Error(JSON.stringify(response))
        }
    }).then(json => {
        if (json.status < 0) {
            responses[returnReduceKey] = undefined
            dispatch({ type: GENERIC_RETURN, data: { ...responses } })

            swal() // TODO: failed

            console.error(json.data)
        } else {
            responses[returnReduceKey] = json.token === null ? json : JSON.stringify(json)
            dispatch({ type: GENERIC_RETURN, data: { ...responses } })

            swal() // TODO: successed
        }
    }).catch((error) => {
        responses[returnReduceKey] = undefined
        dispatch({ type: GENERIC_RETURN, data: { ...responses } })

        swal() // TODO: error
    })
}