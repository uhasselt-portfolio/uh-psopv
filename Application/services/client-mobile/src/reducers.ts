import {applyMiddleware, combineReducers} from 'redux'
import LoginReducer from './pages/login/LoginReducer';
import {createStore} from "redux";
import reduxThunk from "redux-thunk"
import MessageReducer from './pages/message/MessageReducer';
import SendMessageReducer from './pages/send_message/SendMessageReducer'

export default createStore(
    combineReducers({
        login: LoginReducer,
        message: MessageReducer,
        user: SendMessageReducer
    }),
    applyMiddleware(reduxThunk)
)