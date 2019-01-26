import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import FaSignOut from 'react-icons/lib/fa/sign-out'

import Entry from './modules/users/entry'

import { configure } from '../config/configurers'
import { setValue, clearValues } from '../config/dispatchers'

class Index extends Component {

    componentDidMount() {

        const session = JSON.parse(sessionStorage.getItem('session'))
        if (session) {
            setValue(this.props, 'session', session)
        }
    }

    componentDidUpdate() {

        const { responses: { session } } = this.props
        if (session) {
            if (session.status === 16) {
                sessionStorage.setItem('session', JSON.stringify(session))
            }
        }
    }

    logout() {

        clearValues(this.props)
        sessionStorage.clear()
        window.location.hash = '#/'
    }

    render() {

        const { children, responses: { session } } = this.props

        return (
            <div id="main" className="container-fluid">
                <Navbar fixedTop fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#/">
                                <span>
                                    <img alt="presentation" src="images\logo.png" width="30px" />
                                </span>
                                BaseProj
                            </a>
                        </Navbar.Brand>
                        {session ?
                            <div className="text-right" style={{ marginRight: 20 }}>
                                <Nav className="hidden-lg hidden-md hidden-sm">
                                    <NavItem eventKey={2} href="#/" onClick={this.logout.bind(this)}><FaSignOut /> Sair</NavItem>
                                </Nav>
                            </div>
                            : undefined}
                    </Navbar.Header>
                    {session ?
                        <Nav pullRight className="hidden-xs">
                            <NavItem eventKey={2} href="#/" onClick={this.logout.bind(this)}><FaSignOut /> Sair</NavItem>
                        </Nav>
                        : undefined}
                </Navbar>
                <div className="container-fluid">
                    {session ? children : <Entry />}
                </div>
                <Navbar fixedBottom fluid>
                    <div className="text-center">
                        <div className="navbar-footer">
                            <p>BaseProj &copy; Todos os direitos reservados.<br /><span className="badge">Versão 1.0</span></p>
                        </div>
                    </div>
                </Navbar>
            </div>
        )
    }
}

export default configure('session')()(Index)