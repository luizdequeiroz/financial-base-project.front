import React, { Component } from 'react'

import { Field, initialize } from 'redux-form'

import { put, post } from '../../../../config/requesters'
import { bindReduxForm } from '../../../../config/renders'
import Input from '../../../components/input'
import Select from '../../../components/select'

import Loading from '../../../components/loading'
import { setValue } from '../../../../config/dispatchers'

import { numberOnly } from '../../../../config/functions'

const tipos = require('../tipos.json')

function saveLoan(values, route, props) {
    const { client } = props

    if (values.id) return put(props, `company/client/loan/${values.id}`, 'loan', values, { withProccess: true, msgProccess: 'Atualizando dados do empréstimo...', withSuccessedAlert: true })
    else return post(props, `company/client/${client.id}/loan`, 'loan', values, { withProccess: true, msgProccess: 'Salvando dados do empréstimo...', withSuccessedAlert: true })
}

function validate(values) {

    const errors = {}

    // if (!values.modality) {
    //     errors.modality = 'Modalidade do empréstimo obrigatória'
    // }
    if (!values.loanValue) {
        errors.loanValue = 'Valor do empréstimo obrigatório'
    }
    if (!values.bankId) {
        errors.bankId = 'Banco do empréstimo obrigatório'
    }

    return errors
}

class LoanForm extends Component {

    state = {
        modality: undefined
    }

    componentDidMount() {
        const { dispatch, form, loan } = this.props

        loan.loanDate = loan.loanDate && loan.loanDate.substring(0, 10)
        loan.requestDate = loan.requestDate && loan.requestDate.substring(0, 10)

        this.setState({ modality: loan.modality && loan.modality.toString() })

        dispatch(initialize(form, loan))
    }

    componentDidUpdate() {
        const { submitSucceeded, loan } = this.props

        if (submitSucceeded && (loan.status === 22 || loan.status === 23)) window.location.hash = '#/client/loans'
    }

    componentWillMount() {
        const { client } = this.props

        if (!client.id) window.location.hash = '#/clients'
    }

    componentWillUnmount = () => setValue(this.props, 'loan')

    changeModality = (e) => this.setState({ modality: e.target.value })

    render() {
        const { loan, client, pristine, submitting } = this.props
        const { modality } = this.state

        return (
            <div>
                <i className="fa fa-arrow-left fa-2x btn" style={{ float: 'left' }} onClick={() => window.location.hash = '#/client/loans'} />
                <fieldset>
                    <legend>{((loan.loanValue && `Empréstimo de ${loan.loanValue}`) || (loan.data && `Empréstimo de ${loan.data.loanValue}`)) || `Novo empréstimo para ${client.name || "o cliente"}`} <Loading /></legend>
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="col-md-4">
                            <Field onChange={this.changeModality.bind(this)} name="modality" label="Modalidade" component={Select} type="text" placeholder="Informe a modalidade do emprestimo" withoutFistOptionDefault>
                                {tipos.modality.map(m => <option value={m.value}>{m.text}</option>)}
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
                        <div className="col-md-4">
                            <Field name="paymentDate" label="Data de Pagamento" component={Input} type="date" placeholder="Informe a data de pagamento" />
                        </div>
                        {modality === "2" && <div className="col-md-4">
                            <Field name="debtorBalance" label="Saldo Devedor" component={Input} type="text" placeholder="Informe o saldo devedor" />
                        </div>}
                        {modality === "2" && <div className="col-md-4">
                            <Field name="debtorBalanceQtdPart" label="Qtd. Parcelas do Saldo Devedor" component={Input} type="text" placeholder="Qtd. de parcelas do saldo devedor" normalize={numberOnly} />
                        </div>}
                        <div className="col-md-4">
                            <Field name="loanDate" label="Data do Empréstimo" component={Input} type="date" placeholder="Informe a data do empréstimo" />
                        </div>
                        <div className="col-md-4">
                            <Field name="loanValue" label="Valor do Empréstimo" component={Input} type="text" placeholder="Informe o valor do empréstimo" />
                        </div>
                        <div className="col-md-4">
                            <Field name="installmentAmount" label="Qtd. de Prestações" component={Input} type="text" placeholder="Qtd. prestações" normalize={numberOnly} />
                        </div>
                        <div className="col-md-4">
                            <Field name="installmentValue" label="Valor da Prestação" component={Input} type="text" placeholder="Valor da prestação" />
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
                            <a className="btn btn-warning" href="#/client/loans">Cancelar</a>&nbsp;
                        <button className="btn btn-success" type="submit" disabled={pristine || submitting}>Salvar</button>
                        </div>
                    </form>
                </fieldset>
            </div>
        )
    }
}

export default bindReduxForm('client', 'loan')(saveLoan)(validate)(LoanForm)