import React, { Component } from 'react'

import CsvParse from '@vtex/react-csv-parse'
import Dropzone from 'react-dropzone'

import { setValue } from '../../config/dispatchers'
import { csvJSON } from '../../config/functions'
import { bindDefault } from '../../config/renders'

class CsvInput extends Component {

    state = {
        file: {}
    }

    handleData(data) {
        const { props } = this
        const { csvFileReduceKey } = props

        setValue(props, csvFileReduceKey, data)
    }

    handleError(error) {

        console.log(error)
    }

    handleDrop(files) {
        const file = files[0]

        const { props } = this
        const { csvFileReduceKey } = props


        fetch(file.preview)
            .then(response => response.text())
            .then(csvText => setValue(props, csvFileReduceKey, csvJSON(csvText)))
        this.setState({ file })
    }

    render() {
        const { keys } = this.props
        const { file } = this.state

        return (
            <CsvParse
                keys={keys}
                onDataUploaded={this.handleData.bind(this)}
                onError={this.handleError.bind(this)}
                render={onChange =>
                    <Dropzone
                        id="csvFile"
                        accept=".csv"
                        onChange={onChange}
                        onDrop={this.handleDrop.bind(this)}
                        className="csvFileInput"
                    >
                        {file.name !== undefined ? <div className="alert alert-info">{file.name}</div> : <div className="alert">Clique ou arraste o arquivo aqui!</div>}
                    </Dropzone>
                }
            />
        )
    }
}

CsvInput.defaultProps = {
    csvFileReduceKey: 'csvFile',
    keys: []
}

export default bindDefault()(CsvInput)