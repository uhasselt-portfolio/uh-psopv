import {applyMiddleware, combineReducers} from 'redux'
import LoginReducer from './pages/login/LoginReducer';
import {createStore} from "redux";
import reduxThunk from "redux-thunk"

export default createStore(
    combineReducers({
        login: LoginReducer
    }),
    applyMiddleware(reduxThunk)
)