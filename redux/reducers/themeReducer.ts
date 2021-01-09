import { Action } from '../../types'
import { TOGGLE_THEME } from '../actionTypes'

type ThemeType = {
    isDark: boolean,
}

const INITIAL_STATE: ThemeType = {
    isDark: false,
}

export default (state: ThemeType = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return {
                ...state,
                isDark: !state.isDark
            }
        default:
            return state
    }
}