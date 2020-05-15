import {VR_MESSAGE_ADD_FAIL, VR_MESSAGE_ADD_START, VR_MESSAGE_ADD_SUCCESS, FETCH_USER_FROM_SECTOR_FAIL, FETCH_USER_FROM_SECTOR_START, FETCH_USER_FROM_SECTOR_SUCCESS} from "./VR_SendMessageAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case VR_MESSAGE_ADD_START:
            return {...state, loading: true, VRareMessagesSend: false, errorMessage: ""}
        case VR_MESSAGE_ADD_SUCCESS:
            return {...state, loading: false, VRareMessagesSend: action.payload, errorMessage: ""}
        case VR_MESSAGE_ADD_FAIL:
            return {...state, loading: false, VRareMessagesSend: false, errorMessage: action.payload}

        case FETCH_USER_FROM_SECTOR_START:
            return {...state, loading: true, isUserFromSectorFetched: false, errorMessage: ""}
        case FETCH_USER_FROM_SECTOR_SUCCESS:
            return {...state, loading: false, isUserFromSectorFetched: action.payload, errorMessage: ""}
        case FETCH_USER_FROM_SECTOR_FAIL:
            return {...state, loading: false, isUserFromSectorFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}