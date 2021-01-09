import { combineReducers } from "redux";
import userReducer from './userReducer'
import themeReducer from './themeReducer'

export default combineReducers({ userReducer, themeReducer });