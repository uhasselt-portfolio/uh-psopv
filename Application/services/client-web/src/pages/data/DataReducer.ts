import {DataActions} from './DataActions';
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State {
    switch(action.type) {
        case DataActions.Data_POST_START:
            return {...state, loading: true, isFileUploaded: false, errorMessage: ""}
        case DataActions.DATA_POST_SUCCES:
            return {...state, 
                    loading: false, 
                    isFileUploaded: true,
                    errorMessage: ""}
        case DataActions.DATA_POST_FAIL:
            return {...state, loading: false, isFileUploaded: false, errorMessage: action.payload}
        default:
            return state
    }
}