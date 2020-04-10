import { AnyAction, combineReducers } from "redux";
import State from "./state";
import { SET_NOTIFICATION_READ,GET_NOTIFICATION_STATUS } from './actions'


const notificationState = () => {
    return [
        { from_person: "admin", title: "koekies", description: "hello", time_send: "10:10", read: false},
        { from_person: "Maria", title: "test", description: "heasdfasdfll asdf sdo", time_send: "13:10", read: false},
        { from_person: "Wouer", title: "addresswijziging", description: "hello", time_send: "16:20", read: false},
        { from_person: "Mitchel", title: "yo", description: "lorem ipsum dolores", time_send: "15:20", read: true},
    ];
}


      
function Notification(state = false, action: any) {
    switch (action.type) {
        case SET_NOTIFICATION_READ:
            return action.payload;
        default:
            return state
    }
  }

export const todoApp = combineReducers({
    notificationData: notificationState,
    notificationRead: Notification
  })
  

// export default (state = {}, action: AnyAction) => {
//     switch (action.type) {
//         case "UPDATE_NOTIFICATION_READ":
//             return Object.assign({}, state, {
//                 visibilityFilter: action.read
//               })
//         default:
//             return state;
//     }
// };