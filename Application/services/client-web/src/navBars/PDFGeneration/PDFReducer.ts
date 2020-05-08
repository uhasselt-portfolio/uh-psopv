import {PDFActions} from "./PDFActions";
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State{
    switch(action.type) {
        case PDFActions.PDF_FETCH_START:
            return {...state, loading: true, errorMessage: ""}
        case PDFActions.PDF_FETCH_SUCCES:
            return {
                ...state, 
                loading: false, 
                errorMessage: ''}
        case PDFActions.PDF_FETCH_FAIL:
            return {...state, loading: false, errorMessage: action.payload}
        default:
            return state
    }
}