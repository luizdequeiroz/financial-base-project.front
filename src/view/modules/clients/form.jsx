import React, { Component } from 'react'

import { Field, initialize } from 'redux-form'

import { put, post } from '../../../config/requesters'
import { Form } from '../../../config/renders'
import Input from '../../components/input'

import Loading from '../../components/loading'
import { setValue } from '../../../config/dispatchers'

function saveClient(values, route, props) {

    if (values.id) return put(props, `company/client/${values.id}`, 'client', values, { withProccess: true, msgProccess: 'Atualizando dados do cliente...', withSuccessedAlert: true })
    else return post(props, 'company/client', 'client', values, { withProccess: true, msgProccess: 'Salvando dados do cliente...', withSuccessedAlert: true })
}

class ClientForm extends Component {

    componentDidMount() {
        const { dispatch, form, client } = this.props

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
            <fieldset className="container">
                <legend>{(client.name || (client.data && client.data.name)) || 'Novo cliente'} <Loading /></legend>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="col-md-6">
                        <Field name="name" label="Nome" component={Input} type="text" placeholder="Informe o nome do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="rg" label="RG" component={Input} type="text" placeholder="Informe o RG do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="cpf" label="CPF" component={Input} type="text" placeholder="Informe o CPF do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="birthDate" label="Data de Nascimento" component={Input} type="text" placeholder="Informe a Data de nascimento do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="phone" label="Fone" component={Input} type="text" placeholder="Informe o Telefone/Celular do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="email" label="E-mail" component={Input} type="text" placeholder="Informe o E-mail do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="type" label="Tipo de Cliente" component={Input} type="text" placeholder="Informe o Tipo do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="portalRegistration" label="Cadastro do Portal" component={Input} type="text" placeholder="Informe o Cadastro do portal do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="portalPassword" label="Senha do Portal" component={Input} type="text" placeholder="Informe a Senha do portal do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="benefitNumber" label="Número do Benefício" component={Input} type="text" placeholder="Informe o Número do benefício do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="counterCheckPassword" label="Senha do Contracheque" component={Input} type="text" placeholder="Informe a Senha do contracheque do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="bank" label="Banco" component={Input} type="text" placeholder="Informe o Banco do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="agency" label="Agência" component={Input} type="text" placeholder="Informe a Agência do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="account" label="Conta Bancária" component={Input} type="text" placeholder="Informe a Conta do cliente" />
                    </div>
                    <div className="col-md-6">
                        <Field name="op" label="Operação da Conta" component={Input} type="text" placeholder="Informe a Operação da conta do cliente" />
                    </div>
                    <div className="text-right col-md-6">
                        <a className="btn btn-warning" href="#/clients">Cancelar</a>&nbsp;
                        <button className="btn btn-success" type="submit" disabled={pristine || submitting}>Salvar</button>
                    </div>
                </form>
            </fieldset>
        )
    }
}

export default Form('client')(saveClient)(ClientForm)