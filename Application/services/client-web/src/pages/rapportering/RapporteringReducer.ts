import {RapporteringActions} from "./RapporteringAction";
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State{
    switch(action.type) {
        case RapporteringActions.RAPPORTERINGPDF_FETCH_START:
            return {...state, loading: true,  errorMessage: ""}
        case RapporteringActions.RAPPORTERINGPDF_FETCH_SUCCES:
            return {
                ...state, 
                loading: false, 

                allProblems: action.payload,
                errorMessage: ''}
        case RapporteringActions.RAPPORTERINGPDF_FETCH_FAIL:
            return {...state, loading: false, errorMessage: action.payload}
        default:
            return state
    }
}