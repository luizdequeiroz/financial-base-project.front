import React, { Component } from 'react'

class Menu extends Component {

    render() {

        return (
            <div className="flex-menu">
                <div className="flex-menu-item">
                    <div className="panel panel-default" onClick={() => window.location.hash = '#/clients'}>
                        <div className="panel-heading"><i className="fa fa-users fa-5x" /></div>
                        <div className="panel-body">Clientes</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu