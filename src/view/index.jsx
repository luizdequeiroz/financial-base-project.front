import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

import FaSignOut from 'react-icons/lib/fa/sign-out'

import Entry from './modules/entry'

import { setValue, clearValues } from '../config/dispatchers'
import { bindDefault } from '../config/renders'

// import Loading from './components/loading'

class Index extends Component {

    componentDidMount() {

        const session = JSON.parse(sessionStorage.getItem('session'))
        if (session) {
            setValue(this.props, 'session', session)
        }
    }

    componentDidUpdate() {

        const { session } = this.props
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

        const { children, session: { data } } = this.props

        return (
            <div id="main" className="container">
                <Navbar fixedTop fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#/">
                                <span>
                                    <img alt="presentation" src="images\logo.png" width="30px" />
                                </span>
                                BaseProj {/* <Loading /> */}
                            </a>
                        </Navbar.Brand>
                        {data ?
                            <div className="text-right" style={{ marginRight: 20 }}>
                                <Nav className="hidden-lg hidden-md hidden-sm">
                                    <NavItem eventKey={2} href="#/" onClick={this.logout.bind(this)}><FaSignOut /> Sair</NavItem>
                                </Nav>
                            </div>
                            : undefined}
                    </Navbar.Header>
                    {data ?
                        <Nav pullRight className="hidden-xs">
                            <NavItem eventKey={2} href="#/" onClick={this.logout.bind(this)}><FaSignOut /> Sair</NavItem>
                        </Nav>
                        : undefined}
                </Navbar>
                <div className="container-fluid">
                    {data ?
                        <div className="panel" style={{ paddingTop: 80, paddingBottom: 80 }}>
                            <div className="container-fluid">{children}</div>
                        </div> : <Entry />}
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

export default bindDefault('session')(Index)