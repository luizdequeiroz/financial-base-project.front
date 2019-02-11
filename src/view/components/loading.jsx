import React from 'react'
import { Default } from "../../config/renders"

export default Default('loading')(
    props => (
        <span className={`fade ${props.loading.in && 'in'}`}>
            <i className='fa fa-cog fa-spin fa-fw' /> <i className='h6'>{props.loading.text}</i>
        </span>
    )
)