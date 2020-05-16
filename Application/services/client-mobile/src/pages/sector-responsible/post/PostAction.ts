import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'
import { getListLocalStorage, getUserId } from "../../save/saveFunction";

export const POST_FETCH_PLANNING_START = 'POST_FETCH_PLANNING_START'
export const POST_FETCH_PLANNING_SUCCESS = 'POST_FETCH_PLANNING_SUCCESS'
export const POST_FETCH_PLANNING_FAIL = 'POST_FETCH_PLANNING_FAIL'




export const fetchPlanningsFromPost = (post_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        
        let posts = await getListLocalStorage('posts');
        let problemTypes = await getListLocalStorage('problem_types');
        let my_user_id = await getUserId();
        console.log(posts)

        console.log("postsData", posts)
        let postData = posts.find((element: any) => {
            return (post_id == element.post_id)
        })

        console.log("Shifts data", postData)

        dispatch({type: POST_FETCH_PLANNING_SUCCESS, payload: {... postData, problemTypes: problemTypes, my_user_id: my_user_id}})
    } catch(error){
        let postsData = await getListLocalStorage('postsData');
        let problemTypes = await getListLocalStorage('problem_types');

        console.log(error)
        dispatch({type: POST_FETCH_PLANNING_SUCCESS, payload: postsData})
    }
}


export const ITEM_TOGGLE_START = 'ITEM_TOGGLE_START'
export const ITEM_TOGGLE_SUCCESS = 'ITEM_TOGGLE_SUCCESS'
export const ITEM_TOGGLE_FAIL = 'ITEM_TOGGLE_FAIL'

export const itemToggle = (item_id: number, shift_id: Number, toggleValue: boolean) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: ITEM_TOGGLE_START})

        const response = await new Database().ItemToggle(item_id); // TODO GETUSERID

        console.log("toggleValue_ACTION", toggleValue)
        dispatch({type: ITEM_TOGGLE_SUCCESS, payload: {"item_id": item_id, "shift_id": shift_id, "toggleValue": toggleValue}})
    } catch(error){
        dispatch({type: ITEM_TOGGLE_SUCCESS, payload: {"item_id": item_id, "shift_id": shift_id, "toggleValue": toggleValue}})
    }
}



export const PROBLEM_TOGGLE_SUCCESS = 'PROBLEM_TOGGLE_SUCCESS'

export const problemToggle = (probem_id: number, shift_id: Number, toggleValue: boolean) => async (dispatch: Redux.Dispatch) => {
    try{
        const response = await new Database().ProblemToggle(probem_id); // TODO GETUSERID

        dispatch({type: PROBLEM_TOGGLE_SUCCESS, payload: {"problem_id": probem_id, "shift_id": shift_id, "toggleValue": toggleValue}})
    } catch(error){
        dispatch({type: PROBLEM_TOGGLE_SUCCESS, payload: {"problem_id": probem_id, "shift_id": shift_id, "toggleValue": toggleValue}})

    }
}

// export const FETCH_PROBLEM_TYPES_START = 'FETCH_PROBLEM_TYPES_START'
// export const FETCH_PROBLEM_TYPES_SUCCESS = 'FETCH_PROBLEM_TYPES_SUCCESS'
// export const FETCH_PROBLEM_TYPES_FAIL = 'FETCH_PROBLEM_TYPES_FAIL'

// export const problemToggle = (probem_id: number) => async (dispatch: Redux.Dispatch) => {
//     try{
//         dispatch({type: PROBLEM_TOGGLE_START})

//         const response = await new Database().ProblemToggle(probem_id); // TODO GETUSERID

//         dispatch({type: PROBLEM_TOGGLE_SUCCESS})
//     } catch(error){
//         if (error.response) {
//             // Server responded with a code high than 2xx
//             console.log(error.response.data);
//             console.log(error.response.status);
//             console.log(error.response.headers);

//             dispatch({type: PROBLEM_TOGGLE_FAIL, payload: error.response.data.items})
//         } else if (error.request) {
//             // No response was received from the server
//             console.log(error.request);
//         } else {
//             // Request couldn't get send
//             console.log('Error', error.message);
//         }
//     }
// }