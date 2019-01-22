import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

export function configureExportation(formComponent, validate = undefined, warns = undefined) {

    const select = state => ({ responses: state.reducers.responses })
    const createReduxForm = reduxForm({ form: `${formComponent.name.toLowerCase()}Form`, validate, warns })
    formComponent = createReduxForm(formComponent)

    return connect(select)(formComponent)
}