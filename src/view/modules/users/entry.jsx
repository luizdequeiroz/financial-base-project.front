import React, { Component } from 'react'
import { Field } from 'redux-form'
import { configureExportation } from '../../../config/configurers'

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

    render() {

        return (
            <div className="container-fluid">
                <div className="col-md-4">
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
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default configureExportation(Entry, login)