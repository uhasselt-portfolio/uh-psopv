import Redux from 'redux';
import Database from "../../../database/Database";
import {BackgroundGeolocationResponse} from "@ionic-native/background-geolocation";

export const USER_UPDATE_GEOLOCATION_START = 'USER_UPDATE_GEOLOCATION_START'
export const USER_UPDATE_GEOLOCATION_SUCCESS = 'USER_UPDATE_GEOLOCATION_SUCCESS'
export const USER_UPDATE_GEOLOCATION_FAIL = 'USER_UPDATE_GEOLOCATION_FAIL'

export const updateGeolocation = (userLocation: BackgroundGeolocationResponse) => async (dispatch : Redux.Dispatch) => {
    try {
        dispatch({type: USER_UPDATE_GEOLOCATION_START});

        console.log("REQUESTING UPDATE GEOLCOATION USER")
        const response = await new Database().updateUserLocation(userLocation, 1);
        console.log("UPDATED GEOLOCATION")

        const user = response.data.data.user;
        const coordinates = {latitude: user.current_latitude, longitude: user.current_longitude};

        dispatch({type: USER_UPDATE_GEOLOCATION_SUCCESS, payload: coordinates})
    } catch (error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: USER_UPDATE_GEOLOCATION_FAIL, payload: error.response.data.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}

export const PLANNING_FETCH_START = 'PLANNING_FETCH_START'
export const PLANNING_FETCH_SUCCESS = 'PLANNING_FETCH_SUCCESS'
export const PLANNING_FETCH_FAIL = 'PLANNING_FETCH_FAIL'

export const fetchPlannings = () => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PLANNING_FETCH_START})

        const response =  await new Database().fetchPlannings(1);

        let plannings = response.data.data.plannings;

        dispatch({type: PLANNING_FETCH_SUCCESS, payload: plannings})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PLANNING_FETCH_FAIL, payload: error.response.data.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}