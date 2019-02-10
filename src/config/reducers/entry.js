export function session(state = {}, action) {
    switch (action.type) {
        case 'session':
            return action.payload || state
        default:
            return state
    }
}