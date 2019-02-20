import React, { Component } from 'react'

import { Field, initialize } from 'redux-form'

import { put, post } from '../../../config/requesters'
import { bindReduxForm } from '../../../config/renders'
import Input from '../../components/input'
import Select from '../../components/select'

import Loading from '../../components/loading'
import { setValue } from '../../../config/dispatchers'

import { maskCPF, numberOnly, maskTelefone } from '../../../config/functions'

const tipos = require('./tipos.json')

function saveClient(values, route, props) {

    if (values.id) return put(props, `company/client/${values.id}`, 'client', values, { withProccess: true, msgProccess: 'Atualizando dados do cliente...', withSuccessedAlert: true })
    else return post(props, 'company/client', 'client', values, { withProccess: true, msgProccess: 'Salvando dados do cliente...', withSuccessedAlert: true })
}

function validate(values) {

    const errors = {}

    if (!values.name) {
        errors.name = 'Nome do cliente obrigatório.'
    }
    if (!values.birthDate) {
        errors.birthDate = 'Data de nascimento obrigatória.'
    }
    if (!values.cell) {
        errors.cell = 'Celular do cliente obrigatório.'
    }
    if (!values.email) {
        errors.email = 'E-mail do cliente obrigatório.'
    }
    if (!values.bank) {
        errors.bank = 'Banco do cliente obrigatório.'
    }
    //if (values.type === "1" && !values.benefitNumber) {
    //    errors.benefitNumber = 'O número do benefício é obrigatório para cliente INSS.'
    //}
    //if (values.type === "2" && !values.siapNumber) {
    //    errors.siapNumber = 'O número do SIAP é obrigatório para cliente Federal.'
    //}

    return errors
}

class ClientForm extends Component {

    componentDidMount() {
        const { dispatch, form, client } = this.props

        client.birthDate = client.birthDate && client.birthDate.substring(0, 10)

        dispatch(initialize(form, client))
    }

    componentDidUpdate() {
        const { submitSucceeded, client } = this.props

        if (submitSucceeded && client.status === 20) window.location.hash = '#/clients'
    }

    componentWillUnmount = () => setValue(this.props, 'client')

    render() {
        const { client, pristine, submitting } = this.props

        return (
            <fieldset>
                <legend>{(client.name || (client.data && client.data.name)) || 'Novo cliente'} <Loading /></legend>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="col-md-6">
                        <Field name="name" label="Nome" component={Input} type="text" placeholder="Informe o nome do cliente" />
                    </div>
                    <div className="col-md-3">
                        <Field name="rg" label="RG" component={Input} type="text" placeholder="Informe o RG do cliente" normalize={numberOnly} />
                    </div>
                    <div className="col-md-3">
                        <Field name="cpf" label="CPF" component={Input} type="text" placeholder="Informe o CPF do cliente" normalize={maskCPF} />
                    </div>
                    <div className="col-md-4">
                        <Field name="birthDate" label="Data de Nascimento" component={Input} type="date" placeholder="Informe a data de nascimento do cliente" />
                    </div>
                    <div className="col-md-4">
                        <Field name="phone" label="Telefone" component={Input} type="text" placeholder="Informe o telefone" normalize={maskTelefone} />
                    </div>
                    <div className="col-md-4">
                        <Field name="cell" label="Celular" component={Input} type="text" placeholder="Informe o celular" normalize={maskTelefone} />
                    </div>
                    <div className="col-md-4">
                        <Field name="email" label="E-mail" component={Input} type="email" placeholder="Informe o e-mail do cliente" />
                    </div>
                    <div className="col-md-4">
                        <Field name="registration" label="Matrícula" component={Input} type="text" placeholder="Informe a matrícula" />
                    </div>
                    <div className="col-md-4">
                        <Field name="portalPassword" label="Senha" component={Input} type="text" placeholder="Informe a senha do portal" />
                    </div>
                    <div className="col-md-4">
                        <Field name="type" label="Tipo" component={Select} type="text" placeholder="Informe o tipo do cliente">
                            {tipos.client.map(c => <option value={c.value}>{c.text}</option>)}
                        </Field>
                    </div>
                    <div className="col-md-4">
                        <Field name="benefitNumber" label="Nº Benefício" component={Input} type="text" placeholder="Informe o número do benefício" />
                    </div>
                    <div className="col-md-4">
                        <Field name="siapNumber" label="Nº SIAP" component={Input} type="text" placeholder="Informe o número do SIAP" />
                    </div>
                    <div className="col-md-4">
                        <Field name="bank" label="Banco" component={Input} type="text" placeholder="Informe o banco do cliente" list="bankList" />
                        <datalist id="bankList">
                            {tipos.bank.map(b => <option>{b.text}</option>)}
                        </datalist>
                    </div>
                    <div className="col-md-4">
                        <Field name="agency" label="Agência" component={Input} type="text" placeholder="Informe a agência bancária" />
                    </div>
                    <div className="col-md-4">
                        <Field name="account" label="Conta Bancária" component={Input} type="text" placeholder="Informe a conta bancária" />
                    </div>
                    <div className="col-md-4">
                        <Field name="op" label="Op. da Conta" component={Input} type="text" placeholder="Informe a operação da conta" />
                    </div>
                    <div className="col-md-6">
                        <Field name="observation" label="Observação" component={Input} type="textarea" placeholder="Observações sobre o cliente..." />
                    </div>
                    <div className="text-right col-md-12">
                        <a className="btn btn-warning" href="#/clients">Cancelar</a>&nbsp;
                        <button className="btn btn-success" type="submit" disabled={pristine || submitting}>Salvar</button>
                    </div>
                </form>
            </fieldset>
        )
    }
}

export default bindReduxForm('client')(saveClient)(validate)(ClientForm)