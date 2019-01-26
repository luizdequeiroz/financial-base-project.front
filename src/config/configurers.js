import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

export function configure(...responseKeys) {
    
    const selectState = state => {
        let responses = {}
        responseKeys.forEach(key => responses[key] = state.reducers.responses[key])
        return {
            responses
        }
    }

    return (onSubmit = undefined, validate = undefined, warns = undefined) => {

        const selectDispatch = dispatch => bindActionCreators({
            onSubmit
        }, dispatch)

        return (formComponent) => {
            const form = `${formComponent.name.toLowerCase()}Form`

            const createReduxForm = reduxForm({
                form,
                validate,
                warns
            })

            formComponent = createReduxForm(formComponent)
            return connect(selectState, selectDispatch)(formComponent)
        }
    }
}