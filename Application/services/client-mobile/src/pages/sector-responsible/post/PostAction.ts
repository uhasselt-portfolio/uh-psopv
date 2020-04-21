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
            const userNames: any[] = []; 
            sameShift.forEach((element: any) => {
                const name = element.user.first_name + " " + element.user.last_name
                userNames.push(name)
            })

            /* Add items */
            const items: any[] = []; 
            sameShift.forEach(async (planning: any) => {
                const responseItems = await new Database().fetchItemsFromPlanning(planning.id);
                responseItems.data.data.items.forEach((element: any) => {
                    items.push(element)
                });
            })

            /* Add problems */
            const problems: any[] = []; 
            sameShift.forEach(async (planning: any) => {
                const responseProblems = await new Database().fetchProblemsFromPlanning(planning.id);
                responseProblems.data.data.problems.forEach((element: any) => {
                    problems.push(element)
                });
            })

            userShifts.push({shift_id: shift_id, shift_data: sameShift, shift_users: userNames,shift_items: items, shift_problems: problems});
        })

        /* Sort the array by time*/
        userShifts.sort(sortUserShifts)

        dispatch({type: POST_FETCH_PLANNING_SUCCESS, payload: userShifts})

    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: POST_FETCH_PLANNING_FAIL, payload: error.response.data.users})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}


export const ITEM_TOGGLE_START = 'ITEM_TOGGLE_START'
export const ITEM_TOGGLE_SUCCESS = 'ITEM_TOGGLE_SUCCESS'
export const ITEM_TOGGLE_FAIL = 'ITEM_TOGGLE_FAIL'

export const itemToggle = (item_id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: ITEM_TOGGLE_START})

        const response = await new Database().ItemToggle(item_id); // TODO GETUSERID

        dispatch({type: ITEM_TOGGLE_SUCCESS})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: ITEM_TOGGLE_FAIL, payload: error.response.data.items})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
