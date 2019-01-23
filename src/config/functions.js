/**
 * Retorna uma lista de WorkItems ordenados pela prioridade e pela ordem
 */
export function sortWorkItemsByPriority(workItems, ordemCrescente = true) {
    const workItemsSorted = workItems.sort((a, b) => {
        if (ordemCrescente) {
            return (b.fields.Priority < a.fields.Priority) ? 1 : -1
        }
        return (a.fields.Priority < b.fields.Priority) ? 1 : -1
    });

    return workItemsSorted
}

export function dateYMDToDateDMY(date) {
    if (date) {
        var day = date.substr(8,2)
        var month = date.substr(5,2)
        var year = date.substr(0,4)
        
        return `${day}`.concat('/', month, '/', year)
    }
    return '-'
}

/**
 * Formatar a data
 */
export function formatDate(dateTime) {
    if (dateTime) {
        const date = new Date(dateTime)
        let day = date.getDate()
        let month = date.getMonth() + 1
        month = month < 10 ? `0${month}` : month
        day = day < 10 ? `0${day}` : day
        return `${day}`.concat('/', month, '/', date.getFullYear())
    }
    return '-'
}

/**
 * Formatar a data e hora
 */
export function formatDateTime(dateTime) {
    return formatDate(dateTime) + ` ${dateTime.substring(11, 19)}`
}

/**
 * Verifica se o valor passado é numérico.
 * @param {any} value
 * @returns {boolean}
 */
export function isNumber(value) {
    return !isNaN(parseInt(value, 0)) && isFinite(value);
}

/**
 * Retorna CPF com máscara
 * 
 * @param {int} value 
 */
export function maskCPF(value) {

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d)/, '$1.$2')
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    value = value.substring(0, 14)

    return value
}

/**
 * Retorna CNPJ com máscara
 * 
 * @param {int} value 
 */
export function maskCNPJ(value) {

    if (value !== undefined) {
        value = value.replace(/\D/g, '')
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5')
        value = value.substring(0, 19)

        return value
    } else {
        return '-'
    }
}

/**
 * Retorna Telefone com máscara
 * 
 * @param {int} value 
 */
export function maskTelefone(value) {

    if (value.length <= 15) {
        value = value.replace(/\D/g, "")
        value = value.replace(/(\d{4})(\d)/, "$1-$2")

        if (value.length === 10) {
            value = value.replace(/\D/g, "")
            value = value.replace(/(\d{5})(\d)/, "$1-$2")
        }
        if (value.length === 11) {
            value = removerMaskTelefone(value)
            value = value.replace(/\D/g, "")
            value = value.replace(/(\d{6})(\d)/, "$1-$2")
            value = value.replace(/^(\d\d)(\d)/g, "($1) $2")
        }
        if (value.length === 12) {
            value = removerMaskTelefone(value)
            value = value.replace(/\D/g, "")
            value = value.replace(/(\d{7})(\d)/, "$1-$2")
            value = value.replace(/^(\d\d)(\d)/g, "($1) $2")
        }
    } else value = value.substring(0, 15)

    return value
}

/**
 * Retorna texto sem dígitos que não sejam numéricos
 * 
 * @param {string} value 
 */
export function numberOnly(value) {
    return value.replace(/\D/g, "")
}

/**
 * Retorna Telefone sem máscara
 * 
 * @param {int} value 
 */
export function removerMaskTelefone(value) {

    value = value.replace('(', '')
    value = value.replace(')', '')
    value = value.replace(' ', '')
    value = value.replace('-', '')

    return value
}

/**
 * Retorna a idade de acordo com a data de nascimento
 * 
 * @param {date} data 
 */
export function calcularIdade(data) {
    if (data !== undefined) {
        const aniversario = new Date(data)
        const dataAtual = new Date()
        const anoAtual = dataAtual.getFullYear()
        const mesAtual = dataAtual.getMonth() + 1
        const diaAtual = dataAtual.getDate()
        const ano = +aniversario.getFullYear()
        const mes = +aniversario.getMonth() + 1
        const dia = +aniversario.getDate()

        var quantosAnos = anoAtual - ano

        if (mesAtual < mes | mesAtual === mes && diaAtual < dia)
            quantosAnos--

        return quantosAnos < 0 ? 0 : quantosAnos
    } else return 'Não informado'
}

/**
 * Retorna a data de nascimento de acordo com a idade
 * 
 * @param {idade} idade 
 */
export function calcularDataNascimentoDaIdade(idade) {

    const dataAtual = new Date()
    const anoAtual = dataAtual.getFullYear()
    const mesAtual = dataAtual.getMonth()
    const diaAtual = dataAtual.getDate()

    const anoNascimento = anoAtual - idade
    const dataNascimento = `${anoNascimento}-${mesAtual}-${diaAtual}`

    return dataNascimento
}

/**
 * Retorna o valor em formato string com o tamanho estabelecido, completado com zeros à esquerda
 * 
 * @param {value} value 
 * @param {totalWidth} totalWidth 
 * @param {paddingChar} paddingChar 
 */
export function leftPad(value, totalWidth, paddingChar) {
    if (value === undefined) return ''
    var length = totalWidth - value.toString().length + 1
    return Array(length).join(paddingChar || '0') + value
}

export const parseJwt = function (token) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace('-', '+').replace('_', '/')
    return JSON.parse(window.atob(base64))
}

/**
 * Função para transformar um objeto em parâmetros de url (var1=valor1)
 * 
 * @export
 * @param {any} obj
 * @returns
 */
export function serializeObjToUrl(obj) {
    return `?${Object.keys(obj).reduce(
        (a, k) => {
            a.push(`${k}=encodeURIComponent(${obj[k]})`)
            return a
        }, []).join('&')}`
}

/**
 * Função para transformar apenas a primeira letra de cada palavra em caixa alta
 * 
 * @export
 * @param {any} str
 * @returns
 */
export function toTitleCase(str) {
    return str.replace(/\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
}