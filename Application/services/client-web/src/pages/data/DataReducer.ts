import {DataActions} from './DataActions';
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

/**
 * the reducer for redux to handle all the updates comming from DataActions generated by DataPage
 * @param state the current state of the application
 * @param action the action that has been performed
 */
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