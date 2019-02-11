import React, { Component } from 'react'
import { request } from '../../../config/dispatchers'
import BootstrapTable from 'react-bootstrap-table-next'
import { formatDate, maskTelefone, removerMaskTelefone } from '../../../config/functions'
import { Default } from '../../../config/renders'

const enter = 13

class Clients extends Component {

    componentDidMount() {

        request(this.props, 'company/clients/50', 'clients')
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
        request(this.props, `company/property/${this.refs.filterType.value}/${value}/clients`, 'clients')
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
            request(this.props, 'company/clients/50', 'clients')
        }
    }

    render() {
        const { clients } = this.props

        const columns = [{
            dataField: 'id',
            text: 'Código',
            sort: true
        }, {
            dataField: 'name',
            text: 'Nome do Cliente',
            sort: true
        }, {
            dataField: 'birthDate',
            text: 'Data de Nascimento',
            formatter: (cell) => formatDate(cell)
        }, {
            dataField: 'phone',
            text: 'Contato',
            formatter: (cell) => maskTelefone(cell)
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
            sort: true
        }]

        return (
            <fieldset>
                <legend>Lista de Clientes</legend>
                <div className="input-group" style={{ padding: 0, border: 'none' }}>
                    <div className="input-group-addon" style={{ padding: 0, width: '175px' }}>
                        <div className="input-group">
                            <select ref="filterType" className="form-control" style={{ paddingRight: 14, border: 'none', height: '32px' }} onChange={e => this.applyFilterType(e)}>
                                <option value="id">Código</option>
                                <option value="name" selected>Nome</option>
                                <option value="birthDate">Data de Nascimento</option>
                                <option value="phone">Contato</option>
                                <option value="email">E-mail</option>
                                <option value="bank">Banco</option>
                                <option value="type">Tipo</option>
                            </select>
                        </div>
                    </div>
                    <input ref="searchClient" type="text" className="form-control" placeholder="Informe o Nome do cliente..." onKeyUp={e => this.searchTyping(e)} />
                    <span className="input-group-btn">
                        <button className="btn btn-default" onClick={() => this.requestByProperty(this.refs.searchClient.value)}><i className="fa fa-search" /> Buscar</button>
                        <button className="btn btn-primary"><i className="fa fa-plus-circle" /> NOVO</button>
                    </span>
                </div>
                <hr />
                <BootstrapTable keyField='id' data={clients.data || []} columns={columns} search noDataIndication="Não há clientes!" />
            </fieldset >
        )
    }
}

export default Default('clients')(Clients)