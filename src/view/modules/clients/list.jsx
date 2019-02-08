import React, { Component } from 'react'
import { configure } from '../../../config/configurers'
import { request } from '../../../config/dispatchers'

class Clients extends Component {

    componentDidMount() {

        request(this.props, 'company/clients', 'clients')
    }

    render() {
        const { clients } = this.props.responses

        return (
            <div>
                {clients !== undefined ? clients.data.map(c =>
                    <fieldset>
                        <legend>{c.name}</legend>
                    </fieldset>
                ): undefined}
            </div>
        )
    }
}

export default configure({ responseKeys: ['clients'], component: Clients }) //('clients')()(Clients)