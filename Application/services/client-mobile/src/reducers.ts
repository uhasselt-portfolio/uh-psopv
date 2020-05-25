import {applyMiddleware, combineReducers} from 'redux'
import LoginReducer from './pages/login/LoginReducer';

import {createStore} from "redux";
import reduxThunk from "redux-thunk"

// sector-responsible
import MessageReducer from './pages/sector-responsible/messages_general/message/MessageReducer';
import SendMessageReducer from './pages/sector-responsible/messages_general/send_message/SendMessageReducer'

import ContactReducer from './pages/sector-responsible/contact/ContactReducer'
import PersonReducer from './pages/sector-responsible/person/PersonReducer';
import ListReducer from './pages/sector-responsible/list/ListReducer';
import PostReducer from './pages/sector-responsible/post/PostReducer'
// import ShiftReducer from './pages/sector-responsible/shift/ShiftReducer'

// volunteer
import InfoReducer from './pages/volunteer/info/InfoReducer';
import StartReducer from "./pages/volunteer/start/StartReducer";


import {persistStore} from 'redux-persist';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import saveReducer from './pages/save/saveReducer'
import ProblemsReducer from './pages/sector-responsible/messages_general/problems/ProblemsReducer';

const rootReducer = combineReducers({    
    login: LoginReducer,
    list: ListReducer,
    map: ListReducer,
    message: MessageReducer,
    contact: ContactReducer,
    sendMessage: SendMessageReducer,
    person: PersonReducer,
    post: PostReducer,
    problems: ProblemsReducer,
    
    // start: StartReducer,
    VRinfo: InfoReducer,

    // save
    save: saveReducer
})

export const store = createStore(
    rootReducer,
    applyMiddleware(reduxThunk),
)


export default {store};
