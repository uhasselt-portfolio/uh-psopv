import { AnyAction, combineReducers } from "redux";
import UserInfoInterface from './UserInfoInterface'
import { GET_USER_ID } from './AppStateAction'

interface State {
    LoggedUser: UserInfoInterface[]
}

const userState : State = {
    LoggedUser: [{user_id: 1, logged_in: true}]
}


export const userReducer = function (state: State = userState, action: any): State {
    switch (action.type) {
        case GET_USER_ID:
            {
                console.log(state)
               return state
            } 
        default:
            return state
    }
}
  

  
    