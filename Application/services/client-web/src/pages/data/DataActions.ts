import Redux from 'redux';
import Database from '../../Redux/Database';


export enum DataActions {
    Data_POST_START = 'Data_POST_START',
    DATA_POST_SUCCES = 'DATA_POST_SUCCES',
    DATA_POST_FAIL = 'DATA_POST_FAIL'
};

/**
 * lets the database use the file to update its content
 * @param file the file to be uploaded
 * @param isUpdateMode boolean toggle to indicate if the file should update the existing database or override it
 */
export const uploadFile = (file : File, isUpdateMode : boolean) => async (dispatch : Redux.Dispatch) => {
    console.log("in file upload");
    try {
        dispatch({
            type: DataActions.Data_POST_START
        });

        await new Database().postFile(file,isUpdateMode);

        dispatch({
            type: DataActions.DATA_POST_SUCCES
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DataActions.DATA_POST_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}