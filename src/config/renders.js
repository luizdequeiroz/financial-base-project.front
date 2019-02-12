import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'

export function Default(...reducerKeys) {
    const selectState = state => {
        let reducers = {}
        reducerKeys.forEach(key => reducers[key] = state.reducers.reducerKeys[key] || {})
        return reducers
    }

    return (formComponent) => connect(selectState)(formComponent)
}

export function Form(...reducerKeys) {
    const selectState = state => {
        let reducers = {}
        reducerKeys.forEach(key => reducers[key] = state.reducers.reducerKeys[key] || {})
        return reducers
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
