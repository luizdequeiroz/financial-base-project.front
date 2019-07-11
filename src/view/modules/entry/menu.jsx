import React, { Component } from 'react'

const menus = require('./menus.json')

class Menu extends Component {

    render() {

        return (
            <fieldset>
                <legend>Menu</legend>
                <div className="flex-menu">
                    {menus.map((menu, i) => (
                        <div className="flex-menu-item" key={i}>
                            <div className={`panel panel-${menu.type}`} onClick={() => window.location.hash = menu.route}>
                                <div className="panel-heading"><i className={`fa fa-${menu.icon} fa-5x`} /></div>
                                <div className="panel-body">{menu.text}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>
        )
    }
}

export default Menu