import axios from 'axios';
import Redux from 'redux';


export enum MapActions {
    MAP_FETCH_START = 'MAP_FETCH_STRART',
    MAP_FETCH_SUCCES = 'MAP_FETCH_SUCCES',
    MAP_FETCH_FAIL = 'MAP_FETCH_FAIL'
};

export const fetchMap = () => async (dispatch : Redux.Dispatch) => {
    console.log("in map fetch");
    try {
        dispatch({
            type: MapActions.MAP_FETCH_START
        });

        const responseProblems = await axios.get('http://localhost/api/problem/fetch/all');
        const responeUsers = await axios.get('http://localhost/api/user/fetch/all');
        const responsePosts = await axios.get('http://localhost/api/post/fetch/all');

        console.log(responeUsers);
        console.log(responsePosts);
        console.log(responseProblems);

        dispatch({
            type: MapActions.MAP_FETCH_SUCCES,
            payload: {
                problems: [],//TODO
                users: [],
                posts: []
            }
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: MapActions.MAP_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}