import React, { Component } from 'react'

const menus = require('./menus.json')

class Menu extends Component {

    render() {

        return (
            <div className="flex-menu">
                {menus.map(menu => (
                    <div className="flex-menu-item">
                        <div className={`panel panel-${menu.type}`} onClick={() => window.location.hash = menu.route}>
                            <div className="panel-heading"><i className={`fa fa-${menu.icon} fa-5x`} /></div>
                            <div className="panel-body">{menu.text}</div>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default Menu