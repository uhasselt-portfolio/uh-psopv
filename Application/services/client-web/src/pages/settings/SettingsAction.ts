import axios from "axios";
import Redux from 'redux';

export enum SettingsActions {
    SETTINGS_FETCH_START = 'SETTINGS_FETCH_STRART',
    SETTINGS_FETCH_SUCCES = 'SETTINGS_FETCH_SUCCES',
    SETTINGS_FETCH_FAIL = 'SETTINGS_FETCH_FAIL',
    SETTINGS_POST_START = 'SETTINGS_POST_START',
    SETTINGS_POST_SUCCES = 'SETTINGS_POST_SUCCES',
    SETTINGS_POST_FAIL = 'SETTINGS_POST_FAIL'
};


export const fetchSettings = () => async (dispatch : Redux.Dispatch) => {
    console.log("in settings fetch");
    try {
        dispatch({type: SettingsActions.SETTINGS_FETCH_START});

        const respone = await axios.get('http://localhost/api/l'); //TODO correct link

        console.log(respone);

        dispatch({
            type: SettingsActions.SETTINGS_FETCH_SUCCES,
            payload: respone.data.data.delay
        });

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: SettingsActions.SETTINGS_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const postSettings = (NewDelay: Number) => async (dispatch: Redux.Dispatch) => {
    console.log("in settings post");
    try {
        dispatch({type: SettingsActions.SETTINGS_POST_START});

        const respone = await axios.get('http://localhost/api/l'); //TODO correct link

        console.log(respone);

        dispatch({
            type: SettingsActions.SETTINGS_POST_SUCCES,
            payload: respone.data.data.delay
        });

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: SettingsActions.SETTINGS_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}