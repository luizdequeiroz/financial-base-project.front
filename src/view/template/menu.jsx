import React, { Component } from 'react'
import { Navbar, ButtonToolbar, Dropdown, MenuItem } from 'react-bootstrap'

import FaBars from 'react-icons/lib/fa/bars'
import FaSignOut from 'react-icons/lib/fa/sign-out'
import FaFileTextO from 'react-icons/lib/fa/file-text-o'

import { clearValues } from '../../config/dispatchers'
import { configure } from '../../config/configurers'

class Menu extends Component {

    logout() {

        clearValues(this.props)
        sessionStorage.clear()
        window.location.hash = '#/'
    }

    render() {
        
        return (
            <div>                
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <ButtonToolbar>
                            <Dropdown id="dropdown-default-1">
                                <Dropdown.Toggle bsStyle="default">
                                    <FaBars />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="super-colors">
                                    <MenuItem eventKey="1" href="#/clients" title="Clientes"><FaFileTextO /> Clientes</MenuItem>
                                    <MenuItem divider />
                                    <MenuItem eventKey="2" onClick={this.logout.bind(this)}><FaSignOut /> Sair</MenuItem>
                                </Dropdown.Menu>
                            </Dropdown>
                        </ButtonToolbar>
                    </Navbar.Form>
                </Navbar.Collapse>
            </div>
        )
    }
}

export default configure()(Menu)()