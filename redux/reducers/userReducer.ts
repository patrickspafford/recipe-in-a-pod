import { Action } from '../../types'
import { LOGIN, LOGOUT } from '../actionTypes' 

type UserType = {
    isLoggedIn: boolean,
    username: string
}

const INITIAL_STATE: UserType = {
    isLoggedIn: false,
    username: 'guest',
}

export default (state: UserType = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                isLoggedIn: true,
                username: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                username: 'guest'
            }
        default:
            return state

    }
}