import React, { Component } from 'react'
import { Field } from 'redux-form'

import { post } from '../../../config/requesters'
import { Form } from '../../../config/renders'
import Input from '../../components/input';

function saveClient(values, route, props) {

    return post(props, `company/client${(props.client || '') && `/${props.client.id}`}`, 'client', values, { withProccessAlert: true, msgProccessAlert: 'Salvando dados do cliente', withSuccessedAlert: true })
}

function validate(values) {

    const errors = {}

    return errors
}

class ClientForm extends Component {

    render() {
        const { client } = this.props
debugger
        return (
            <fieldset className="container">
                <legend>{client ? client.name : 'Novo cliente'}</legend>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="col-md-6">
                        <Field name="name" label="Nome" component={Input} type="text" placeholder="Informe o nome do cliente" value={client.name} />
                    </div>
                    <div className="col-md-6">
                        <Field name="rg" label="RG" component={Input} type="text" placeholder="Informe o RG do cliente" value={client.rg} />
                    </div>
                    <div className="col-md-6">
                        <Field name="cpf" label="CPF" component={Input} type="text" placeholder="Informe o CPF do cliente" value={client.cpf} />
                    </div>
                    <div className="col-md-6">
                        <Field name="birthDate" label="Data de Nascimento" component={Input} type="text" placeholder="Informe a Data de nascimento do cliente" value={client.birthDate} />
                    </div>
                    <div className="col-md-6">
                        <Field name="phone" label="Fone" component={Input} type="text" placeholder="Informe o Telefone/Celular do cliente" value={client.phone} />
                    </div>
                    <div className="col-md-6">
                        <Field name="email" label="E-mail" component={Input} type="text" placeholder="Informe o E-mail do cliente" value={client.email} />
                    </div>
                    <div className="col-md-6">
                        <Field name="type" label="Tipo de Cliente" component={Input} type="text" placeholder="Informe o Tipo do cliente" value={client.type} />
                    </div>
                    <div className="col-md-6">
                        <Field name="portalRegistration" label="Cadastro do Portal" component={Input} type="text" placeholder="Informe o Cadastro do portal do cliente" value={client.portalRegistration} />
                    </div>
                    <div className="col-md-6">
                        <Field name="portalPassword" label="Senha do Portal" component={Input} type="text" placeholder="Informe a Senha do portal do cliente" value={client.portalPassword} />
                    </div>
                    <div className="col-md-6">
                        <Field name="benefitNumber" label="Número do Benefício" component={Input} type="text" placeholder="Informe o Número do benefício do cliente" value={client.benefitNumber} />
                    </div>
                    <div className="col-md-6">
                        <Field name="counterCheckPassword" label="Senha do Contracheque" component={Input} type="text" placeholder="Informe a Senha do contracheque do cliente" value={client.counterCheckPassword} />
                    </div>
                    <div className="col-md-6">
                        <Field name="bank" label="Banco" component={Input} type="text" placeholder="Informe o Banco do cliente" value={client.bank} />
                    </div>
                    <div className="col-md-6">
                        <Field name="agency" label="Agência" component={Input} type="text" placeholder="Informe a Agência do cliente" value={client.agency} />
                    </div>
                    <div className="col-md-6">
                        <Field name="account" label="Conta Bancária" component={Input} type="text" placeholder="Informe a Conta do cliente" value={client.account} />
                    </div>
                    <div className="col-md-6">
                        <Field name="op" label="Operação da Conta" component={Input} type="text" placeholder="Informe a Operação da conta do cliente" value={client.op} />
                    </div>
                    <div className="text-right col-md-6">
                        <a className="btn btn-warning" href="#/clients">Cancelar</a>&nbsp;
                        <button className="btn btn-success" type="submit">Salvar</button>
                    </div>
                </form>
            </fieldset>
        )
    }
}

export default Form('client')(saveClient, validate)(ClientForm)