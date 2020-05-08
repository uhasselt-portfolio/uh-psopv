import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const POST_FETCH_PLANNING_START = 'POST_FETCH_PLANNING_START'
export const POST_FETCH_PLANNING_SUCCESS = 'POST_FETCH_PLANNING_SUCCESS'
export const POST_FETCH_PLANNING_FAIL = 'POST_FETCH_PLANNING_FAIL'

function sortUserShifts(a: any, b: any){
    var shift_begin_a = new Date(a.shift_data[0].shift.begin)
    var shift_begin_b = new Date(b.shift_data[0].shift.begin)

    if(shift_begin_a < shift_begin_b){
        return -1
    }
    else if(shift_begin_a > shift_begin_b){
        return 1
    } else{
        return 0
    }
}

export const fetchPlanningsFromPost = (post_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: POST_FETCH_PLANNING_START})

        const responsePlannings = await new Database().fetchPlanningsWithPostId(post_id);
        const responseItems = await new Database().fetchAllItems();
        const responseProblems = await new Database().fetchAllProblems();


        /* Add all Same shift together */
        const shifts: any[] = []; // array with shift_id's
        responsePlannings.data.data.plannings.forEach((element: any) => {
            if(!shifts.includes(element.shift_id)){
                shifts.push(element.shift_id)
            }
        });

        const userShifts: any[] = []; 
        shifts.forEach((shift_id: number) => {
            let sameShift = responsePlannings.data.data.plannings.filter((element: any) => {
                return element.shift_id === shift_id
            });


            /* Add User Names */
            let userNames: any[] = []; 
            sameShift.forEach((element: any) => {
                const name = element.user.first_name + " " + element.user.last_name
                userNames.push(name)
            })

            /* Add items */
            let items: any[] = []; 
            sameShift.forEach((planning: any) => {
                let new_items = responseItems.data.data.items.filter((item: any) => {
                    return item.planning_id === planning.id
                });
                
                new_items.forEach((element: any, index: number) => {
                    items.push(element)
                });
            })

            /* Add problems */
            let problems: any[] = []; 
            sameShift.forEach((planning: any) => {
                let new_problems = responseProblems.data.data.problems.filter((problem: any) => {
                    return problem.planning_id === planning.id
                });
                new_problems.forEach((element: any, index: number) => {
                    problems.push(element)
                });
            })

            userShifts.push({shift_id: shift_id, shift_data: sameShift, shift_users: userNames,shift_items: items, shift_problems: problems});
        })

        /* Sort the array by time*/
        userShifts.sort(sortUserShifts)
        dispatch({type: POST_FETCH_PLANNING_SUCCESS, payload: userShifts})
    } catch(error){
        // if (error.response) {
        //     // Server responded with a code high than 2xx
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);

        //     dispatch({type: POST_FETCH_PLANNING_FAIL})
        // } else if (error.request) {
        //     // No response was received from the server
        //     dispatch({type: POST_FETCH_PLANNING_FAIL})
        //     console.log(error.request);
        // } else {
        //     // Request couldn't get send
        //     dispatch({type: POST_FETCH_PLANNING_FAIL})
        //     console.log('Error', error.message);
        // }
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
        dispatch({type: ITEM_TOGGLE_FAIL, payload: {"item_id": item_id, "shift_id": shift_id, "toggleValue": toggleValue}})
    }
}

export const PROBLEM_TOGGLE_START = 'PROBLEM_TOGGLE_START'
export const PROBLEM_TOGGLE_SUCCESS = 'PROBLEM_TOGGLE_SUCCESS'
export const PROBLEM_TOGGLE_FAIL = 'PROBLEM_TOGGLE_FAIL'

export const problemToggle = (probem_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PROBLEM_TOGGLE_START})

        const response = await new Database().ProblemToggle(probem_id); // TODO GETUSERID

        dispatch({type: PROBLEM_TOGGLE_SUCCESS})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PROBLEM_TOGGLE_FAIL, payload: error.response.data.items})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
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