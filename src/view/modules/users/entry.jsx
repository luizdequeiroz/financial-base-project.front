import React, { Component } from 'react'
// import swal from 'sweetalert2'

class Entry extends Component {

    render() {

        return (
            <div className="container">
                <div className="form-group">
                    <input type="text" placeholder="usuário ou e-mail" className="form-control" />
                    <input type="password" placeholder="senha" className="form-control" />
                </div>
            </div>
        )
    }
}

export default Entry