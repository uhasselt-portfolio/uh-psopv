import {SettingsActions} from "./SettingsAction";
import {AnyAction} from "redux";
import State, {initialState} from '../../Redux/State';

export default function (state : State = initialState, action : AnyAction) : State{
    switch(action.type) {
        case SettingsActions.SETTINGS_FETCH_START:
            return {...state, loading: true, isSettingsFetched: false, errorMessage: ""}
        case SettingsActions.SETTINGS_FETCH_SUCCES:
            return {
                ...state, 
                loading: false, 
                isSettingsFetched: true,
                positionDelay: action.payload,
                errorMessage: ''}
        case SettingsActions.SETTINGS_FETCH_FAIL:
            return {...state, loading: false, isProblemFetched: false, errorMessage: action.payload}
        case SettingsActions.SETTINGS_POST_START:
            return {...state, loading: true, isSettingsFetched: false, errorMessage: ""}
        case SettingsActions.SETTINGS_POST_SUCCES:
            return {
                ...state, 
                loading: false, 
                isSettingsFetched: true,
                positionDelay: action.payload,
                errorMessage: ''}
        case SettingsActions.SETTINGS_POST_FAIL:
            return {...state, loading: false, isProblemFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}