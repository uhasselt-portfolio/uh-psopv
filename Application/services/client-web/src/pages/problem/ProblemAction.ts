import axios from "axios";
import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';

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

        let problems: ProblemDataInterface[] = [];
        for (let i = 0; i < respone.data.data.problems.length; ++i) {
            problems.push({
                id: respone.data.data.problems[i].id,
                problemType: respone.data.data.problems[i].problem_type.title,
                priority: respone.data.data.problems[i].problem_type.priority,
                discription: respone.data.data.problems[i].problem_type.discription,
                timeStamp: respone.data.data.problems[i].created_at,
                shiftName: respone.data.data.problems[i].planning.shift.name,
                post: respone.data.data.problems[i].planning.post.title,
                user: respone.data.data.problems[i].planning.user.first_name + " " + respone.data.data.problems[i].planning.user.last_name,
                sender: respone.data.data.problems[i].created_by.first_name + " " + respone.data.data.problems[i].created_by.last_name,
                latitude: respone.data.data.problems[i].planning.post.latitude,
                longitude: respone.data.data.problems[i].planning.post.longitude,   //TODO
                solved: respone.data.data.problems[i].solved
            })
        }

        dispatch({
            type: PostActions.PROBLEM_FETCH_SUCCESS,
            payload: problems
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