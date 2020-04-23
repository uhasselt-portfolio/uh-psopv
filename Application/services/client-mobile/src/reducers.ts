import {applyMiddleware, combineReducers} from 'redux'
import LoginReducer from './pages/login/LoginReducer';

import {createStore} from "redux";
import reduxThunk from "redux-thunk"

// sector-responsible
import MessageReducer from './pages/sector-responsible/message/MessageReducer';
import SendMessageReducer from './pages/sector-responsible/send_message/SendMessageReducer'
import ContactReducer from './pages/sector-responsible/contact/ContactReducer'
import PersonReducer from './pages/sector-responsible/person/PersonReducer';
import ListReducer from './pages/sector-responsible/list/ListReducer';
import PostReducer from './pages/sector-responsible/post/PostReducer'

// volunteer
import InfoReducer from './pages/volunteer/info/InfoReducer';
import VR_MessageReducer from './pages/volunteer/message/VR_MessageReducer';
import VR_SendMessageReducer from './pages/volunteer/send_message/VR_SendMessageReducer';

export default createStore(
    combineReducers({
        login: LoginReducer,
        list: ListReducer,
        map: ListReducer,
        message: MessageReducer,
        contact: ContactReducer,

        sendMessage: SendMessageReducer,
        person: PersonReducer,
        post: PostReducer,
        info: InfoReducer,

        vr_message: VR_MessageReducer,
    }),
    applyMiddleware(reduxThunk)
)