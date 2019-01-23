import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

export function configureExportation(formComponent, onSubmit, validate = undefined, warns = undefined) {    
    const form = `${formComponent.name.toLowerCase()}Form`
    
    const selectState = state => ({ responses: state.reducers.responses })
    const selectDispatch = dispatch => bindActionCreators({ onSubmit }, dispatch)

    const createReduxForm = reduxForm({ form, validate, warns })
    formComponent = createReduxForm(formComponent)

    return connect(selectState, selectDispatch)(formComponent)
}