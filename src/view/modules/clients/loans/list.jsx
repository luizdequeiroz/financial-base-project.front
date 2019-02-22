import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { formatDate } from '../../../../config/functions'
import { bindDefault } from '../../../../config/renders'
import { get } from '../../../../config/requesters'
import { setValue } from '../../../../config/dispatchers'

import Loading from '../../../components/loading'

// import LoanView from './view'

const msgSearching = 'Pesquisando empréstimos do cliente...'

const tipos = require('../tipos.json')

class Loans extends Component {

    componentDidMount() {
        const { props } = this
        const { client } = props

        get(props, `company/client/${client.id}/loans`, 'loans', { withProccess: true, msgProccess: msgSearching })
    }

    componentWillMount() {
        const { client } = this.props

        if (!client.id) window.location.hash = '#/clients'
    }

    // expandRow = row => <LoanView loan={row} />

    render() {
        const { props } = this
        const { loans, client } = props

        const columns = [{
            dataField: 'id',
            text: 'Código',
            sort: true
        }, {
            dataField: 'modality',
            text: 'Modalidade',
            sort: true,
            formatter: cell => tipos.modality.filter(m => m.value === cell)[0].text
        }, {
            dataField: 'status',
            text: 'Status',
            sort: true,
            formatter: cell => tipos.status.filter(s => s.value === cell)[0].text
        }, {
            dataField: 'loanValue',
            text: 'Valor do Empréstimo',
            sort: true
        }, {
            dataField: 'bankId',
            text: 'Banco',
            formatter: cell => tipos.bank.filter(b => b.value === cell)[0].text
        }, {
            dataField: 'registerDate',
            text: 'Data Registrada',
            sort: true,
            formatter: cell => formatDate(cell)
        }, {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: '60px' }
        }]

        const _loans = (loans.data || []).map(loan => ({
            ...loan,
            actions: <a className="btn btn-primary btn-xs" href="#/client/loan/form" onClick={() => setValue(props, 'loan', loan)}>Editar</a>
        }))

        return (
            <div>
                <i className="fa fa-arrow-left fa-2x btn" style={{ float: 'left' }} onClick={() => window.location.hash = '#/clients'} />
                <fieldset>
                    <legend>
                        <div style={{ float: 'left' }}>Empréstimos de {client.name} <Loading /></div>
                        <div style={{ float: 'right' }}>
                            <a className="btn btn-primary btn-xs" href="#/client/loan/form"><i className="fa fa-plus-circle" /> NOVO</a>
                        </div>
                    </legend>
                    <BootstrapTable striped rowClasses="expansibleRowTable" /* expandRow={{ renderer: this.expandRow }} */ keyField='id' data={_loans} columns={columns} search noDataIndication={loans.data ? `Não há empréstimos para ${client.name}!` : <Loading />} />
                </fieldset>
            </div>
        )
    }
}

export default bindDefault('client', 'loans')(Loans)