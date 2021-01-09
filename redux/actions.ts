import { LOGIN, LOGOUT, TOGGLE_THEME } from './actionTypes'

export const toggleTheme = () => ({
    type: TOGGLE_THEME,
    payload: undefined,
})

export const login = (username: string) => ({
    type: LOGIN,
    payload: username
})

export const logout = () => ({
    type: LOGOUT,
    payload: undefined
})