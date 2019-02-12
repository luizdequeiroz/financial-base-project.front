import React, { Component } from 'react'
import { Field } from 'redux-form'

import Input from '../../components/input'
import { Form } from '../../../config/renders'
import { post } from '../../../config/requesters'

// import FaArrowRight from 'react-icons/lib/fa/arrow-right'

import Loading from '../../components/loading'

function login(values, route, props) {

    return post(props, 'entry/login', 'session', values, { withProccess: true, msgProccess: 'Autenticando...', withWarningAlert: true, msgWarningAlert: 'E-mail ou senha incorreto!', withErrorAlert: true, msgErrorAlert: 'Erro de comunicação com serviço de autenticação.' })
}

function validate(values) {

    const errors = {}

    if (!values.email) {
        errors.email = 'E-mail obrigatório.'
    }

    if (!values.password) {
        errors.password = 'Senha obrigatória.'
    }

    return errors
}

class Entry extends Component {

    render() {

        return (
            <div className="content-centered panel-form">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Entrada <Loading /></h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.props.handleSubmit}>
                            <fieldset>
                                <div className="form-group">
                                    <Field name="email" component={Input} type="email" placeholder="E-mail" />
                                </div>
                                <div className="form-group">
                                    <Field name="password" component={Input} type="password" placeholder="Senha" />
                                </div>
                                <button type="submit" className="btn btn-success">Entrar</button>
                                {/* <a href="#/" className="btn btn-link" style={{ float: "right" }}>Cadastrar <FaArrowRight /></a> */}
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }    
}

export default Form()(login, validate)(Entry)