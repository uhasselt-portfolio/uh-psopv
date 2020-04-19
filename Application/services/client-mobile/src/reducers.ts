import {applyMiddleware, combineReducers} from 'redux'
import LoginReducer from './pages/login/LoginReducer';
import InfoReducer from './pages/info/InfoReducer';
import { userReducer} from './redux/AppStateReducer'

import {createStore} from "redux";
import reduxThunk from "redux-thunk"

export default createStore(
    combineReducers({
        login: LoginReducer,
        info: InfoReducer,
        user_id: userReducer
    }),
    applyMiddleware(reduxThunk)
)