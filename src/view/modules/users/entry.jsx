import React, { Component } from 'react'
import { Field, formValueSelector  } from 'redux-form'
import { configureExportation } from '../../../config/configurers';

class Entry extends Component {  

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    login(e) {
        e.preventDefault()

        const selector = formValueSelector('entryForm')
        const email = selector(this.state, 'email')
        console.log(email)
        debugger
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
                                        <Field name="email" component="input" type="text" placeholder="" />
                                    </div>
                                    <div className="form-group">
                                        <Field name="password" component="input" type="password" />
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