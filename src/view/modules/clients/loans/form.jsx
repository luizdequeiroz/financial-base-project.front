import React, { Component } from 'react'

import { Field, initialize } from 'redux-form'

import { put, post } from '../../../../config/requesters'
import { bindReduxForm } from '../../../../config/renders'
import Input from '../../../components/input'
import Select from '../../../components/select'

import Loading from '../../../components/loading'
import { setValue } from '../../../../config/dispatchers'

const tipos = require('../tipos.json')

function saveLoan(values, route, props) {
    const { client } = props

    if (values.id) return put(props, `company/client/loan/${values.id}`, 'loan', values, { withProccess: true, msgProccess: 'Atualizando dados do empréstimo...', withSuccessedAlert: true })
    else return post(props, `company/client/${client.id}/loan`, 'loan', values, { withProccess: true, msgProccess: 'Salvando dados do empréstimo...', withSuccessedAlert: true })
}

function validate(values) {

    const errors = {}

    if (!values.modality) {
        errors.modality = 'Modalidade do empréstimo obrigatória'
    }
    if (!values.loanValue) {
        errors.loanValue = 'Valor do empréstimo obrigatório'
    }
    if (!values.bankId) {
        errors.bankId = 'Banco do empréstimo obrigatório'
    }

    return errors
}

class LoanForm extends Component {

    componentDidMount() {
        const { dispatch, form, loan } = this.props

        loan.loanDate = loan.loanDate && loan.loanDate.substring(0, 10)
        loan.requestDate = loan.requestDate && loan.requestDate.substring(0, 10)

        dispatch(initialize(form, loan))
    }

    componentDidUpdate() {
        const { submitSucceeded, loan } = this.props

        if (submitSucceeded && loan.status === 23) window.location.hash = '#/client/loans'
    }

    componentWillMount() {
        const { client } = this.props

        if (!client.id) window.location.hash = '#/clients'
    }

    componentWillUnmount = () => setValue(this.props, 'loan')

    render() {
        const { loan, client, pristine, submitting } = this.props

        return (
            <fieldset>
                <legend>{((loan.loanValue && `Empréstimo de ${loan.loanValue}`) || (loan.data && `Empréstimo de ${loan.data.loanValue}`)) || `Novo empréstimo para ${client.name || "o cliente"}`} <Loading /></legend>
                <form onSubmit={this.props.handleSubmit}>
                    <div className="col-md-4">
                        <Field name="modality" label="Modalidade" component={Select} type="text" placeholder="Informe a modalidade do emprestimo">
                            {tipos.loan.map(l => <option value={l.value}>{l.text}</option>)}
                        </Field>
                    </div>
                    <div className="col-md-4">
                        <Field name="status" label="Status" component={Select} type="text" placeholder="Informe o status do emprestimo" withoutFistOptionDefault>
                            {tipos.status.map(s => <option value={s.value}>{s.text}</option>)}
                        </Field>
                    </div>
                    <div className="col-md-4">
                        <Field name="requestDate" label="Data da Solicitação" component={Input} type="date" placeholder="Informe a data de solicitação" />
                    </div>
                    <div className="col-md-5">
                        <Field name="loanDate" label="Data do Empréstimo" component={Input} type="date" placeholder="Informe a data do empréstimo" />
                    </div>
                    <div className="col-md-5">
                        <Field name="loanValue" label="Valor do Empréstimo" component={Input} type="text" placeholder="Informe o valor do empréstimo" />
                    </div>
                    <div className="col-md-3">
                        <Field name="installmentAmount" label="Qtd. de Prestações" component={Input} type="number" placeholder="Qtd. prestações" />
                    </div>
                    <div className="col-md-5">
                        <Field name="installmentValue" label="Valor da Prestação" component={Input} type="text" placeholder="Informe o valor da prestação" />
                    </div>
                    <div className="col-md-4">
                        <Field name="totalPayable" label="Total a Pagar" component={Input} type="text" placeholder="Informe o valor total a pagar" />
                    </div>
                    <div className="col-md-4">
                        <Field name="bankId" label="Banco" component={Select} type="text" placeholder="Informe o banco do empréstimo">
                            {tipos.bank.map(b => <option value={b.value}>{b.text}</option>)}
                        </Field>
                    </div>
                    <div className="col-md-6">
                        <Field name="observation" label="Observação" component={Input} type="textarea" placeholder="Observações sobre o empréstimo..." />
                    </div>
                    <div className="text-right col-md-12">
                        <a className="btn btn-warning" href="#/client/loans">Voltar</a>&nbsp;
                        <button className="btn btn-success" type="submit" disabled={pristine || submitting}>Salvar</button>
                    </div>
                </form>
            </fieldset>
        )
    }
}

export default bindReduxForm('client', 'loan')(saveLoan)(validate)(LoanForm)