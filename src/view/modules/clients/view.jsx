import React, { Component } from 'react'
import { bindDefault } from '../../../config/renders'
import { formatDate } from '../../../config/functions'
import { setValue } from '../../../config/dispatchers'

const defaultInfo = "Não informado."
const tipos = require('./tipos.json')

class ClientView extends Component {

    setClient() {
        const { props } = this
        const { client } = props

        setValue(props, 'client', client)
    }

    render() {
        
        const { props } = this
        const { client } = props

        return (
            <div className="panel">
                <div className="panel-body">
                    <fieldset className="col-md-6">
                        <legend className="h5">Dados pessoais:</legend>
                        {(client.type === 3 || client.registration) && <div className="col-md-6">
                            <strong>Matrícula: </strong><span>{client.registration || defaultInfo}</span>
                        </div>}
                        {(client.type === 3 || client.portalPassword) && <div className="col-md-6">
                            <strong>Senha do portal: </strong><span>{client.portalPassword || defaultInfo}</span>
                        </div>}
                        <div className="col-md-6">
                            <strong>CPF: </strong><span>{client.cpf || defaultInfo}</span>
                        </div>
                        <div className="col-md-6">
                            <strong>RG: </strong><span>{client.rg || defaultInfo}</span>
                        </div>
                    </fieldset>
                    <fieldset className="col-md-6">
                        <legend className="h5">Dados bancários:</legend>
                        <div className="col-md-6">
                            <strong>Agência: </strong><span>{client.agency || defaultInfo}</span>
                        </div>
                        <div className="col-md-6">
                            <strong>Conta: </strong><span>{client.account || defaultInfo}</span>
                        </div>
                        <div className="col-md-6">
                            <strong>Op: </strong><span>{client.op || defaultInfo}</span>
                        </div>
                    </fieldset>
                    <fieldset className="col-md-6">
                        <legend className="h5">Mais informações (cliente {tipos.client.filter(c => c.value === client.type)[0].text}):</legend>
                        {(client.type === 1 || client.type === 2) && <div className="col-md-6">
                            <strong>{client.type === 1 ? "Nº Benefício" : (client.type === 2 && "Nº SIAP")}: </strong><span>{client.type === 1 ? client.benefitNumber : client.siapNumber}</span>
                        </div>}
                        <div className="col-md-6">
                            <strong>Data de Cadastro: </strong><span>{formatDate(client.registerDate)}</span>
                        </div>
                        {client.margin > 0 && <div className="col-md-6">
                            <strong>Margem: </strong><span>{client.margin} em {formatDate(client.marginDate)}</span>
                        </div>}
                        <div className="col-md-12">
                            <strong>Observação: </strong><span>{client.observation || defaultInfo}</span>
                        </div>
                    </fieldset>
                </div>
                <div className="panel-footer">
                    <div className="text-right">
                        <div className="btn-group">
                            <a className="btn btn-primary" href="#/client/form" onClick={this.setClient.bind(this)}><i className="fa fa-edit" /> Editar</a>
                            <a className="btn btn-success" href="#/client/loans" onClick={this.setClient.bind(this)}><i className="fa fa-money" /> Empréstimos</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default bindDefault()(ClientView)