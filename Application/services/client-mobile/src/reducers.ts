import {applyMiddleware, combineReducers} from 'redux'
import LoginReducer from './pages/login/LoginReducer';
import { userReducer} from './redux/AppStateReducer'

import {createStore} from "redux";
import reduxThunk from "redux-thunk"
import MessageReducer from './pages/sector-responsible/message/MessageReducer';
import SendMessageReducer from './pages/sector-responsible/send_message/SendMessageReducer'
import ContactReducer from './pages/sector-responsible/contact/ContactReducer'
import PersonReducer from './pages/sector-responsible/person/PersonReducer';
import PostReducer from './pages/sector-responsible/post/PostReducer';
import ListReducer from './pages/sector-responsible/list/ListReducer';
import MapReducer from './pages/sector-responsible/map/MapReducer';
import InfoReducer from './pages/volunteer/info/InfoReducer';

export default createStore(
    combineReducers({
        login: LoginReducer,
        message: MessageReducer,
        sendMessage: SendMessageReducer,
        contact: ContactReducer,
        person: PersonReducer,
        post: PostReducer,
        list: ListReducer,
        map: MapReducer,
        info: InfoReducer,
        user_id: userReducer
    }),
    applyMiddleware(reduxThunk)
)