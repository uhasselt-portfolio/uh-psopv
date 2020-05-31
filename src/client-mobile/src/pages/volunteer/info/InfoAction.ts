import Redux from 'redux';
import Database from "../../../database/Database";
import {BackgroundGeolocationResponse} from "@ionic-native/background-geolocation";
import { getListLocalStorage, addObjectToActionList } from '../../save/saveFunction';
import Auth from '../../../utils/Auth';

export const USER_UPDATE_GEOLOCATION_START = 'USER_UPDATE_GEOLOCATION_START'
export const USER_UPDATE_GEOLOCATION_SUCCESS = 'USER_UPDATE_GEOLOCATION_SUCCESS'
export const USER_UPDATE_GEOLOCATION_FAIL = 'USER_UPDATE_GEOLOCATION_FAIL'

export const updateGeolocation = (userLocation: BackgroundGeolocationResponse) => async (dispatch : Redux.Dispatch) => {
    try {
        dispatch({type: USER_UPDATE_GEOLOCATION_START});

        const response = await new Database().updateUserLocation(userLocation, Auth.getAuthenticatedUser().id);

        const user = response.data.data.user;
        const coordinates = {latitude: user.current_latitude, longitude: user.current_longitude};

        dispatch({type: USER_UPDATE_GEOLOCATION_SUCCESS, payload: coordinates})
    } catch (error) {
        // offline database
        await addObjectToActionList('/user/modify', Auth.getAuthenticatedUser().id, {
            user: {
                current_latitude: userLocation.latitude,
                current_longitude: userLocation.longitude
            }
        });

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




export const PLANNING_FROM_ID_FETCH_START = 'PLANNING_FROM_ID_FETCH_START'
export const PLANNING_FROM_ID_FETCH_SUCCESS = 'PLANNING_FROM_ID_FETCH_SUCCESS'
export const PLANNING_FROM_ID_FETCH_FAIL = 'PLANNING_FROM_ID_FETCH_FAIL'

export const fetchPlanningsFromId = (user_id: number)  => async (dispatch: Redux.Dispatch) => {
    try{

        let plannings = await getListLocalStorage('plannings');
        
        dispatch({type: PLANNING_FROM_ID_FETCH_SUCCESS, payload: plannings})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PLANNING_FROM_ID_FETCH_FAIL, payload: error.response.data.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}