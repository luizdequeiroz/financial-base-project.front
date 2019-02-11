import React, { Component } from 'react'
import { Field } from 'redux-form'

import { post } from '../../../config/requesters'
import { Form } from '../../../config/renders'
import Input from '../../components/input';

function saveClient(values, route, props) {

    debugger
    return post(props, `company/client${props.client && `/${props.client.id}`}`, 'client', values, { withProccessAlert: true, msgProccessAlert: 'Salvando dados do cliente', withSuccessedAlert: true })
}

function validate(values) {

    const errors = {}

    return errors
}

class ClientForm extends Component {

    render() {
        const { client } = this.props

        return (
            <fieldset>
                <legend>{client ? client.name : 'Novo cliente'}</legend>
                <div className="form-group">
                    <Field name="name" label="Nome" component={Input} type="text" placeholder="Informe o nome do cliente" />
                </div>
            </fieldset>
        )
    }
}

export default Form()(saveClient, validate)(ClientForm)