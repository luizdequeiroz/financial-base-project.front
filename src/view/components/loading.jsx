import React from 'react'
import { bindDefault } from "../../config/renders"

export default bindDefault('loading')(
    props => (
        <span className={`fade ${props.loading.in && 'in'}`}>
            <i className='fa fa-cog fa-spin fa-fw' /> <i className='h6'>{props.loading.text}</i>
        </span>
    )
)