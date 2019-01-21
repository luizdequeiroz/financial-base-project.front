import React, { Component } from 'react'
import { Navbar } from 'react-bootstrap'

class Index extends Component {

    render() {

        return (
            <div id="main" className="container-fluid">
                <div style={{ marginTop: 60 }}>
                    <Navbar fluid fixedTop>
                        
                    </Navbar>
                    {this.props.children}
                    <Navbar fluid fixedBottom>
                        <div className="text-center">
                            <div className="navbar-footer">
                                <p>BaseProj &copy; Todos os direitos reservados.<br /><span className="badge">Versão 1.0</span></p>
                            </div>
                        </div>
                    </Navbar>
                </div>
            </div>
        )
    }
}

export default Index