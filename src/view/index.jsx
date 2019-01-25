import React, { Component } from 'react'

import Header from './template/header'
import Menu from './template/menu'
import Footer from './template/footer'
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
    }

    render() {

        return (
            <div id="main" className="container-fluid">
                <div className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <Header />
                        {this.props.responses.session ? <Menu /> : undefined}
                    </div>
                </div>
                <div className="container-fluid">
                    {this.props.responses.session ? this.props.children : <Entry />}
                </div>
                <Footer />
            </div>
        )
    }
}

export default configure()(Index)('session')