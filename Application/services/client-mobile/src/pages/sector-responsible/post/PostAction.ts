import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'

export const PLANNING_POST_ID_FETCH_START = 'PLANNING_POST_ID_FETCH_START'
export const PLANNING_POST_ID_FETCH_SUCCESS = 'PLANNING_POST_ID_FETCH_SUCCESS'
export const PLANNING_POST_ID_FETCH_FAIL = 'PLANNING_POST_ID_FETCH_FAIL'

function getTiming(data: any): number {
    let sum = 0;
    sum += data.slice(0,4) * 10000

    sum += (data.slice(5,7) * 1000)

    sum += (data.slice(8,10) * 100)

    sum += (data.slice(11,13) * 10)
    return sum
}

function compare(a: any, b: any) {
    if (getTiming(a.shift.begin) < getTiming(b.shift.begin)) {
      return -1;
    }
    if (getTiming(a.shift.begin) > getTiming(b.shift.begin)) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }

function printDate(data: any){
    data.forEach((element: any, index: number) => {
        console.log(index, element.shift.begin)
    });
}

export const fetchPlanningsWithPostId = (id: number) => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PLANNING_POST_ID_FETCH_START})

        const response = await new Database().fetchPlanningsWithPostId(id);

        // new list with all same_shifts placed together
        const plannings = response.data.data.plannings
        plannings.sort(compare)

        dispatch({type: PLANNING_POST_ID_FETCH_SUCCESS, payload: plannings})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PLANNING_POST_ID_FETCH_FAIL, payload: error.response.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}
