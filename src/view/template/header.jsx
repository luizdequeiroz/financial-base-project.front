import React, { Component } from 'react'

import { Navbar } from 'react-bootstrap'

class Header extends Component {

    render() {

        return (
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#/">
                        <span>
                            <img alt="presentation" src="images\logo.png" width="30px" />
                        </span>
                        BaseProj
                    </a>
                </Navbar.Brand>
            </Navbar.Header>
        )
    }
}

export default Header