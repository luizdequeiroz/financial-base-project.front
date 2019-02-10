export function clients(state = [], action) {
    switch (action.type) {
        case 'clients':
            return action.payload || state
        default:
            return state
    }
}