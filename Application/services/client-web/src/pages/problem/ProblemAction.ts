import axios from "axios";
import Redux from 'redux';

export enum PostActions {
    PROBLEM_FETCH_START = 'PROBLEM_FETCH_START',
    PROBLEM_FETCH_SUCCESS = 'PROBLEM_FETCH_SUCCESS',
    PROBLEM_FETCH_FAIL = 'PROBLEM_FETCH_FAIL'
};


export const fetchProblem = () => async (dispatch : Redux.Dispatch) => {
    console.log("in problem fetch");
    try {
        dispatch({type: PostActions.PROBLEM_FETCH_START});

        const respone = await axios.get('http://localhost/api/problem/fetch/all');

        dispatch({
            type: PostActions.PROBLEM_FETCH_SUCCESS,
            payload: respone.data.data.problems
        });

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PostActions.PROBLEM_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}