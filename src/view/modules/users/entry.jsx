import React, { Component } from 'react'
import { Field, formValueSelector  } from 'redux-form'
import { configureExportation } from '../../../config/configurers';

class Entry extends Component {  

    constructor(props) {
        super(props)

        this.state = { }
    }

    login(e) {
        e.preventDefault()
        debugger
        const selector = formValueSelector('entryForm')
        const email = selector(this.state, 'email', 'password')
        console.log(email)
    }

    render() {

        return (
            <div className="container-fluid">
                <div className="col-md-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">Entrada</h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.login.bind(this)}>
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

export default configureExportation(Entry)