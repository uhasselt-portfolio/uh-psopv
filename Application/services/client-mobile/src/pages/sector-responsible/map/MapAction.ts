import axios from "axios"
import Redux from 'redux';

export const PROBLEM_POST_FETCH_START = 'PROBLEM_POST_FETCH_START'
export const PROBLEM_POST_FETCH_SUCCESS = 'PROBLEM_POST_FETCH_SUCCESS'
export const PROBLEM_POST_FETCH_FAIL = 'PROBLEM_POST_FETCH_FAIL'


export const fetchProblemsAndPosts = () => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PROBLEM_POST_FETCH_START})

        const responseProblems = await axios.get('http://localhost/api/problem/fetch/all/');
        const responsePosts = await axios.get('http://localhost/api/post/fetch/all/');

        const response = {"problems": responseProblems.data.data.problems, "posts": responsePosts.data.data.posts}

        dispatch({type: PROBLEM_POST_FETCH_SUCCESS, payload: response})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PROBLEM_POST_FETCH_FAIL, payload: error.response.data.message})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
