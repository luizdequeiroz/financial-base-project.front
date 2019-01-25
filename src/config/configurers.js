import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

export function configure(onSubmit = undefined, validate = undefined, warns = undefined) {
    return (formComponent) => {
        const form = `${formComponent.name.toLowerCase()}Form`

        const selectDispatch = dispatch => bindActionCreators({
            onSubmit
        }, dispatch)

        const createReduxForm = reduxForm({
            form,
            validate,
            warns
        })
        formComponent = createReduxForm(formComponent)

        return (...responseKeys) => {
            const selectState = state => {
                let responses = {}
                responseKeys.forEach(key => responses[key] = state.reducers.responses[key])
                return {
                    responses
                }
            }
            return connect(selectState, selectDispatch)(formComponent)
        }
    }
}