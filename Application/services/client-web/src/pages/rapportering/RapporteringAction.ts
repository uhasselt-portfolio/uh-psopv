import axios from "axios";
import Redux from 'redux';

export enum RapporteringActions {
    RAPPORTERINGPDF_FETCH_START = 'RAPPORTERINGPDF_FETCH_STRART',
    RAPPORTERINGPDF_FETCH_SUCCES = 'RAPPORTERINGPDF_FETCH_SUCCES',
    RAPPORTERINGPDF_FETCH_FAIL = 'RAPPORTERINGPDF_FETCH_FAIL'
};


export const generatepdf = () => async (dispatch : Redux.Dispatch) => {
    console.log("in rapporerign generate pdf");
    try {
        dispatch({type: RapporteringActions.RAPPORTERINGPDF_FETCH_START});

        const respone = await axios.get('http://localhost/api/problem/fetch/all'); //TODO generate and get pdf

        dispatch({
            type: RapporteringActions.RAPPORTERINGPDF_FETCH_SUCCES,
        });

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: RapporteringActions.RAPPORTERINGPDF_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}