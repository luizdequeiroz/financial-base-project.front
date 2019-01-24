import React, { Component } from 'react'
import { Field } from 'redux-form'
import { configureExportation } from '../../../config/configurers'

import FaArrowRight from 'react-icons/lib/fa/arrow-right'
import { request } from '../../../config/dispatchers';

function login(values, route, props) {

    return {
        props,
        type: 'request',
        method: 'entry/login',
        methodType: 'POST',
        returnReduceKey: 'session',
        param: values
    }
}

class Entry extends Component {

    componentDidMount() {

        request(this.props, 'entry/users/1', 'user')
    }

    render() {

        return (
            <div className="content-centered panel-form">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">Entrada</h3>
                    </div>
                    <div className="panel-body">
                        <form onSubmit={this.props.handleSubmit}>
                            <fieldset>
                                <div className="form-group">
                                    <Field name="email" component="input" type="text" placeholder="E-mail" className="form-control" />
                                </div>
                                <div className="form-group">
                                    <Field name="password" component="input" type="password" placeholder="Senha" className="form-control" />
                                </div>
                                <button type="submit" className="btn btn-success">Entrar</button>
                                <a href="#/" style={{ float: "right" }}>Cadastrar <FaArrowRight /></a>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default configureExportation(Entry, login)