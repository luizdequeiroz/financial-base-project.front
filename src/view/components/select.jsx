import React, { Component } from 'react'

export class Select extends Component {

    render() {

        const { options, firstOption, input, defaultValue, label, meta: { touched, error, warning } } = this.props
        const inputProps = { defaultValue }
        const divInputProps = label ? {
            className: `input-group`
        } : undefined

        input.style = touched && error ? { border: 'solid 1px red', borderRadius: '4px' } : undefined

        return (
            <div className="form-group">
                {touched && ((
                    (error || value === firstOption) && <div className="h6 text-danger" style={{ marginTop: '-13px', marginBottom: '0px' }}>{error}</div>
                ) || (
                    warning && <div className="h6 text-warning" style={{ marginTop: '-13px', marginBottom: '0px' }}>{warning}</div>
                ))}
                <div {...divInputProps}>
                    {label && <label className="input-group-addon">{label}</label>}
                    <select className="form-control" onChange={e => this.setState({ value: e.target.value })} {...input} {...inputProps}>
                        <option>{firstOption}</option>
                        {children || options.map(o => (
                            <option key={o.value} value={o.value}>{o.text}</option>
                        ))}
                    </select>
                </div>
            </div>
        )
    }
}
SysSelect.defaultProps = {
    options: [],
    firstOption: 'Selecione'
}

export default Select