import React, { Component } from 'react'

class Input extends Component {

    render() {

        const { input, label, type, placeholder, meta: { touched, error, warning } } = this.props
        const inputProps = { type, placeholder }
        const divInputProps = label ? {
            className: `input-group`
        } : undefined

        input.style = touched && error ? { border: 'solid 1px red', borderRadius: '4px' } : undefined

        return (
            <div className="form-group">
                {touched && ((
                    error && <div className="h6 text-danger" style={{ marginTop: '-13px', marginBottom: '0px' }}>{error}</div>
                ) || (
                    warning && <div className="h6 text-warning" style={{ marginTop: '-13px', marginBottom: '0px' }}>{warning}</div>
                ))}
                <div {...divInputProps}>
                    {label && <label className="input-group-addon">{label}</label>}
                    <input className="form-control" {...input} {...inputProps} />
                </div>
            </div>
        )
    }
}

export default Input