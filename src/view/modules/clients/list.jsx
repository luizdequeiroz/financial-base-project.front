import React, { Component } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import { formatDate, maskTelefone, removerMaskTelefone } from '../../../config/functions'
import { bindDefault } from '../../../config/renders'
import { get, post, del } from '../../../config/requesters'
import { setValue } from '../../../config/dispatchers'

import Loading from '../../components/loading'
import CsvInput from '../../components/csvinput'

import ClientView from './view'
import swal from 'sweetalert'

const enter = 13
const msgSearching = 'Pesquisando clientes...'

const tipos = require('./tipos.json')

class Clients extends Component {

    state = {
        importation: false
    }

    componentDidMount() {

        get(this.props, 'company/clients/50', 'clients', { withProccess: true, msgProccess: msgSearching })
    }

    applyFilterType(e) {
        const value = e.target.value
        this.refs.searchClient.type = 'text'
        if (value === 'id') {
            this.refs.searchClient.type = 'number'
            this.refs.searchClient.placeholder = 'Informe o Código do cliente...'
            this.refs.searchClient.value = ''
        } else if (value === 'name') {
            this.refs.searchClient.placeholder = 'Informe o Nome do cliente...'
            this.refs.searchClient.value = ''
        } else if (value === 'birthDate') {
            this.refs.searchClient.type = 'date'
            this.refs.searchClient.placeholder = 'Informe a Data de Nascimento do cliente...'
            this.refs.searchClient.value = ''
        } else if (value === 'phone') {
            this.refs.searchClient.placeholder = 'Informe o Telefone/Celular do cliente...'
            this.refs.searchClient.value = ''
        } else if (value === 'email') {
            this.refs.searchClient.placeholder = 'Informe o E-mail do cliente...'
            this.refs.searchClient.value = ''
        } else if (value === 'bank') {
            this.refs.searchClient.placeholder = 'Informe o Banco do cliente...'
            this.refs.searchClient.value = ''
        } else if (value === 'type') {
            this.refs.searchClient.placeholder = 'Informe o Tipo do cliente...'
            this.refs.searchClient.value = ''
        }
    }

    requestByProperty(value) {
        value = this.refs.filterType.value === 'phone' ? removerMaskTelefone(value) : value
        get(this.props, `company/property/${this.refs.filterType.value}/${value}/clients`, 'clients', { withProccess: true, msgProccess: msgSearching })
    }

    searchTyping(e) {
        const value = e.target.value
        if (value !== '') {
            if (e.keyCode !== enter) {
                if (this.refs.filterType.value === 'phone') {
                    this.refs.searchClient.value = maskTelefone(value)
                }
            } else {
                this.requestByProperty(value)
            }
        } else {
            get(this.props, 'company/clients/50', 'clients', { withProccess: true, msgProccess: msgSearching })
        }
    }

    importCsvFile() {
        const { props } = this
        const { csvFile } = props

        post(props, 'company/import/clients', 'clients', csvFile, { withProccess: true, msgProccess: 'Importando arquivo...' })
    }

    expandRow = row => <ClientView client={row} />

    deleteClient(id) {
        const { props } = this

        swal({
            title: 'Deletar cliente?',
            text: "Deseja realmente deletar este cliente?!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(willDelete => {
            if (willDelete) {
                del(props, `company/client/${id}/delete`, 'clientDeleted', { withProccess: true, withSuccessedAlert: true })
                setTimeout(() => get(props, 'company/clients/50', 'clients', { withProccess: true, msgProccess: msgSearching }), 3000)
            }
        })
    }

    render() {
        const { props } = this
        const { clients } = props
        const { importation } = this.state

        const columns = [{
            dataField: 'id',
            text: 'Id',
            sort: true
        }, {
            dataField: 'name',
            text: 'Nome do Cliente',
            sort: true
        }, {
            dataField: 'margin',
            text: 'Margem',
            sort: true
        }, {
            dataField: 'birthDate',
            text: 'Data de Nascimento',
            formatter: cell => formatDate(cell)
        }, {
            dataField: 'phone',
            text: 'Telefone/Celular',
            formatter: (cell, row) => (cell ? maskTelefone(cell) + (row.cell ? " | " : "") : "") + (row.cell ? maskTelefone(row.cell) : "")
        }, {
            dataField: 'email',
            text: 'E-mail'
        }, {
            dataField: 'bank',
            text: 'Banco',
            sort: true
        }, {
            dataField: 'type',
            text: 'Tipo',
            sort: true,
            formatter: cell => tipos.client.filter(c => c.value === cell)[0].text
        }, {
            dataField: 'actions',
            text: 'Ações',
            headerStyle: { width: '120px' }
        }]

        const _clients = (clients.data || []).map(client => ({
            ...client,
            actions: (
                <div className="btn-group">
                    <a className="btn btn-primary btn-xs" href="#/client/form" onClick={() => setValue(props, 'client', client)}>Editar</a>
                    <button className="btn btn-danger btn-xs" onClick={() => this.deleteClient(client.id)}>Excluir</button>
                </div>
            )
        }))

        return (
            <fieldset>
                <legend>
                    <div style={{ float: 'left' }}>Lista de Clientes <Loading /></div>
                    <div style={{ float: 'right' }} hidden={importation}>
                        <button className="btn btn-success btn-xs" onClick={() => this.setState({ importation: true })}><i className="fa fa-upload" /> Importar CSV</button>
                    </div>
                </legend>
                <div className="input-group" style={{ padding: 0, border: 'none' }}>
                    <div className="input-group-addon" style={{ padding: 0, width: '175px' }}>
                        <div className="input-group">
                            <select ref="filterType" className="form-control" style={{ paddingRight: 14, border: 'none', height: '32px' }} onChange={e => this.applyFilterType(e)}>
                                <option value="id">Id</option>
                                <option value="name" selected>Nome</option>
                                <option value="birthDate">Data de Nascimento</option>
                                <option value="phone">Telefone/Celular</option>
                                <option value="email">E-mail</option>
                                <option value="bank">Banco</option>
                                <option value="type">Tipo</option>
                            </select>
                        </div>
                    </div>
                    <input ref="searchClient" type="text" className="form-control" placeholder="Informe o Nome do cliente..." onKeyUp={e => this.searchTyping(e)} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={() => this.requestByProperty(this.refs.searchClient.value)}><i className="fa fa-search" /> Buscar</button>
                        <a className="btn btn-primary" href="#/client/form"><i className="fa fa-plus-circle" /> NOVO</a>
                    </span>
                </div>
                {importation ?
                    <div>
                        <hr />
                        <CsvInput csvFileReduceKey='csvFile' />
                        <div className="text-center">
                            <div className="btn-group btn-group-xs">
                                <button className="btn btn-warning" onClick={() => this.setState({ importation: false })}><i className="fa fa-close" /> Cancelar</button>
                                <button className="btn btn-success" onClick={this.importCsvFile.bind(this)}><i className="fa fa-upload" /> Importar</button>
                            </div>
                        </div>
                        <hr />
                    </div>
                    : <hr />}
                <BootstrapTable striped rowClasses="expansibleRowTable" expandRow={{ renderer: this.expandRow }} keyField='id' data={_clients} columns={columns} search noDataIndication={clients.data ? "Não há clientes!" : <Loading />} />
            </fieldset>
        )
    }
}

export default bindDefault('clients', 'csvFile')(Clients)