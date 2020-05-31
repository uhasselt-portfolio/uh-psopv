import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'
import { getListLocalStorage, addObjectToActionList, setListLocalStorage } from "../../save/saveFunction";
import Auth from "../../../utils/Auth";

export const POST_FETCH_PLANNING_START = 'POST_FETCH_PLANNING_START'
export const POST_FETCH_PLANNING_SUCCESS = 'POST_FETCH_PLANNING_SUCCESS'
export const POST_FETCH_PLANNING_FAIL = 'POST_FETCH_PLANNING_FAIL'


export const fetchPlanningsFromPost = (post_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        
        let posts = await getListLocalStorage('posts');
        let problemTypes = await getListLocalStorage('problem_types');
        let my_user_id = Auth.getAuthenticatedUser().id;

        let postData = posts.find((element: any) => {
            return (post_id == element.post_id)
        })
        
        console.log(postData, problemTypes, my_user_id)
        let result: any =  {... postData, problemTypes: problemTypes, my_user_id: my_user_id}

        dispatch({type: POST_FETCH_PLANNING_SUCCESS, payload: result})
    } catch(error){
        console.log(error.message)
    }
}

export const ITEM_TOGGLE_SUCCESS = 'ITEM_TOGGLE_SUCCESS'

export const itemToggle = (item_id: number, shift_id: number, post_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        const response = await new Database().toggleItemLostStatus(item_id);

        let result = await toggleItem(item_id, shift_id, post_id);
        
        dispatch({type: ITEM_TOGGLE_SUCCESS, payload: result})
    } catch(error){
        addObjectToActionList('/item/toggle-lost/', item_id, {})
        let result = toggleItem(item_id, shift_id, post_id);

        dispatch({type: ITEM_TOGGLE_SUCCESS, payload: result})
        
    }
}

export const PROBLEM_TOGGLE_SUCCESS = 'PROBLEM_TOGGLE_SUCCESS'

export const problemToggle = (probem_id: number, shift_id: number, post_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        const response = await new Database().toggleProblemSolvedStatus(probem_id); // TODO GETUSERID

        let result = await toggleProblem(probem_id, shift_id, post_id);

        dispatch({type: PROBLEM_TOGGLE_SUCCESS, payload: result})

        // dispatch({type: PROBLEM_TOGGLE_SUCCESS, payload: response})
    } catch(error){
        addObjectToActionList('/problem/toggle-solve/', probem_id, {})

        let result = toggleProblem(probem_id, shift_id, post_id);
        
        dispatch({type: PROBLEM_TOGGLE_SUCCESS, payload: result})
    }
}

async function toggleItem(item_id: number, shift_id: number, post_id: number){
    let posts = await getListLocalStorage('posts');
    let problemTypes = await getListLocalStorage('problem_types');
    let my_user_id = Auth.getAuthenticatedUser().id;

    let post_index = 0;
    let postData = posts.find((element: any, index: number) => {
        post_index = index;
        return (post_id == element.post_id)
    })

    let otherPostData = posts.filter((element: any) => {
        return (post_id != element.post_id)
    })

    let shift_index = 0;
    let shiftData = postData.shifts.find((element: any, index: number) => {
        shift_index = index;
        return (shift_id == element.shift_id)
    })

    let otherShiftsData = postData.shifts.filter((element: any) => {
        return (shift_id != element.shift_id)
    })

    let item_index = 0;
    let problemData = shiftData.shift_items.find((element: any, index: number) => {
        item_index = index;
        return (item_id == element.item_id)
    })

    let OtherProblems = shiftData.shift_items.filter((element: any) => {
        return (item_id != element.item_id)
    })

    let new_problemData = {...problemData, item_lost: !problemData.item_lost}
    OtherProblems.splice(item_index, 0, new_problemData);

    shiftData = {...shiftData, shift_items: OtherProblems};
    otherShiftsData.splice(shift_index, 0, shiftData);

    postData = {...postData, shifts: otherShiftsData};
    otherPostData.splice(post_index, 0, postData);


    await setListLocalStorage('posts', otherPostData);

    return {... postData, problemTypes: problemTypes, my_user_id: my_user_id}
}

async function toggleProblem(probem_id: number, shift_id: number, post_id: number){
    let posts = await getListLocalStorage('posts');
    let problemTypes = await getListLocalStorage('problem_types');
    let my_user_id = Auth.getAuthenticatedUser().id;
    let post_index = 0;
    let postData = posts.find((element: any, index: number) => {
        post_index = index;
        return (post_id == element.post_id)
    })

    let otherPostData = posts.filter((element: any) => {
        return (post_id != element.post_id)
    })

    let shift_index = 0;
    let shiftData = postData.shifts.find((element: any, index: number) => {
        shift_index = index;
        return (shift_id == element.shift_id)
    })

    let otherShiftsData = postData.shifts.filter((element: any) => {
        return (shift_id != element.shift_id)
    })

    let problem_index = 0;
    let problemData = shiftData.shift_problems.find((element: any, index:number) => {
        problem_index = index;
        return (probem_id == element.problem_id)
    })

    let OtherProblems = shiftData.shift_problems.filter((element: any) => {
        return (probem_id != element.problem_id)
    })

    let ProblemData = {...problemData, problem_solved: !problemData.problem_solved}
    OtherProblems.splice(problem_index, 0, ProblemData);

    shiftData = {...shiftData, shift_problems: OtherProblems};
    otherShiftsData.splice(shift_index, 0, shiftData);

    postData = {...postData, shifts: otherShiftsData};
    otherPostData.splice(post_index, 0, postData);

    await setListLocalStorage('posts', otherPostData);

    return {... postData, problemTypes: problemTypes, my_user_id: my_user_id};
}



export const ADD_PROBLEM_SUCCESS = 'ADD_PROBLEM_SUCCESS'

export const addProblem = (shift_id: number, post_id: number, params: any) => async (dispatch: Redux.Dispatch) => {
    try{
        const responseAddProblem = await new Database().addProblem(params);
        const responseToggleProblem = await new Database().toggleProblemSolvedStatus(responseAddProblem.data.data.problem.id);


        let result = await addProblemToLocalStorage(shift_id, post_id, params, responseAddProblem.data.data.problem);

        dispatch({type: ADD_PROBLEM_SUCCESS, payload: result})
    } catch(error){
        addObjectToActionList('/problem/add', undefined, params)

        // let result = await addProblemToLocalStorage(shift_id, post_id, params);

        // dispatch({type: ADD_PROBLEM_SUCCESS, payload: result})
    }
}

async function addProblemToLocalStorage(shift_id: number, post_id: number, params: any, problem: any){
    let posts = await getListLocalStorage('posts');
    let problemTypes = await getListLocalStorage('problem_types');
    let user_info = Auth.getAuthenticatedUser();

    let response_post_details = await new Database().getProblemType(params.problem_type_id);
    let post_details = response_post_details.data.data.problemType;

    let new_problem = {
        problem_id: problem.id,
        problem_solved: true,
        problem_title: post_details.title,
        problem_description: post_details.description,
        problem_priority: post_details.priority,
        created_at: post_details.created_at,
        created_by_name: user_info.first_name + user_info.last_name,
        created_by_phone_number: user_info.phone_number,
        created_by_email: user_info.email}


    let post_index = 0;
    let postData = posts.find((element: any, index: number) => {
        post_index = index;
        return (post_id == element.post_id)
    })
    let otherPostData = posts.filter((element: any) => {
        return (post_id != element.post_id)
    })
    let shift_index = 0;
    let shiftData = postData.shifts.find((element: any, index: number) => {
        shift_index = index;
        return (shift_id == element.shift_id)
    })
    let otherShiftsData = postData.shifts.filter((element: any) => {
        return (shift_id != element.shift_id)
    })

    let newShiftProblems = shiftData.shift_problems.concat(new_problem)
    console.log(newShiftProblems);    

    shiftData = {...shiftData, shift_problems: newShiftProblems};
    otherShiftsData.splice(shift_index, 0, shiftData);
    console.log(otherShiftsData)

    postData = {...postData, shifts: otherShiftsData};
    otherPostData.splice(post_index, 0, postData);

    await setListLocalStorage('posts', otherPostData);

    return {... postData, problemTypes: problemTypes, my_user_id: user_info.id};

}


export const REMOVE_PROBLEM_SUCCESS = 'REMOVE_PROBLEM_SUCCESS'

export const removeProblem = (shift_id: number, post_id: number, problem_id: any) => async (dispatch: Redux.Dispatch) => {
    try{
        console.log("REMOVEEE PROBLEEEM")

        // const response = await new Database().removeProblem(problem_id); // TODO REMOVE DATABASE

        let result = await removeProblemToLocalStorage(shift_id, post_id, problem_id);

        dispatch({type: REMOVE_PROBLEM_SUCCESS, payload: result})
    } catch(error){
        console.log(error)
        addObjectToActionList('/problem/delete/', problem_id, {})

        let result = await removeProblemToLocalStorage(shift_id, post_id, problem_id);

        dispatch({type: REMOVE_PROBLEM_SUCCESS, payload: result})
    }
}

async function removeProblemToLocalStorage(shift_id: number, post_id: number, problem_id: any){
    let posts = await getListLocalStorage('posts');
    let problemTypes = await getListLocalStorage('problem_types');
    let my_user_id = Auth.getAuthenticatedUser().id;


    let post_index = 0;
    let postData = posts.find((element: any, index: number) => {
        post_index = index;
        return (post_id == element.post_id)
    })


    let otherPostData = posts.filter((element: any) => {
        return (post_id != element.post_id)
    })
    let shift_index = 0;
    let shiftData = postData.shifts.find((element: any, index: number) => {
        shift_index = index;
        return (shift_id == element.shift_id)
    })
    let otherShiftsData = postData.shifts.filter((element: any) => {
        return (shift_id != element.shift_id)
    })
    
    // remove the problem
    let OtherProblems = shiftData.shift_problems.filter((element: any) => {
        return (problem_id != element.problem_id)
    })

    console.log(OtherProblems, "OtherProblems")

    shiftData = {...shiftData, shift_problems: OtherProblems};
    otherShiftsData.splice(shift_index, 0, shiftData);
    console.log(otherShiftsData)

    postData = {...postData, shifts: otherShiftsData};
    otherPostData.splice(post_index, 0, postData);

    await setListLocalStorage('posts', otherPostData);

    return {... postData, problemTypes: problemTypes, my_user_id: my_user_id};

}

