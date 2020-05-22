import {ADD_PROBLEM_SUCCESS, REMOVE_PROBLEM_SUCCESS,
    POST_FETCH_PLANNING_FAIL, POST_FETCH_PLANNING_START, POST_FETCH_PLANNING_SUCCESS, ITEM_TOGGLE_SUCCESS, PROBLEM_TOGGLE_SUCCESS} from "./PostAction";
import {AnyAction} from "redux";

import { toggle } from "ionicons/icons";


export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case POST_FETCH_PLANNING_START:
            return {...state, loading: true, arePlanningsFormPostFetched: false, errorMessage: ""}
        case POST_FETCH_PLANNING_SUCCESS:
            console.log(action.payload)
            return {...state, loading: false, localStorage: action.payload, errorMessage: ""}
        case POST_FETCH_PLANNING_FAIL:
            return {...state, loading: false, arePlanningsFormPostFetched: false, errorMessage: action.payload}

        case ITEM_TOGGLE_SUCCESS:
            console.log("ITEM_TOGGLE_SUCCESS")
            // let new_localstate: any = updateItemFromState(action.payload.item_id, action.payload.shift_id, state.localState, action.payload.toggleValue)            
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}
        case PROBLEM_TOGGLE_SUCCESS:
            // let localstate: any = updateProblemFromState(action.payload.problem_id, action.payload.shift_id, state.localState, action.payload.toggleValue)            
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}
        case ADD_PROBLEM_SUCCESS:
            // let localstate: any = updateProblemFromState(action.payload.problem_id, action.payload.shift_id, state.localState, action.payload.toggleValue)            
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}
        case REMOVE_PROBLEM_SUCCESS:
            return {...state, localStorage: action.payload, loading: false, errorMessage: ""}

        default:
            return state
    }
}

function updateProblemFromState(problem_id: Number, shift: Number, localState: any, toggleValue: boolean): any{
    for(let index_shift = 0; index_shift < localState.shifts_data.length; index_shift++){
        let element = localState.shifts_data[index_shift];

        if (element.shift_id === shift){
            for(let index_problem = 0; index_problem < element.problems.length; index_problem++){
                let data = element.problems[index_problem];

            // element.items.forEach((data: any, index_item: Number) =>{
                if (data.id === problem_id){
                    // shifts
                    let shifts_data = localState.shifts_data;
                    let editShift = shifts_data[+index_shift] //copy the array
                    let beforeShifts: any[] = [];
                    if(index_shift != 0){
                        console.log("index_shift", index_shift)
                        beforeShifts = localState.shifts_data.slice(0, index_shift)
                    } 
                    const afterShifts = localState.shifts_data.slice(+index_shift + 1, localState.shifts_data.length)
                    

                    // items
                    let shift_items = editShift.problems;
                    let editItem = editShift.problems[+index_problem] //copy the array
                    let beforeItems: any[] = [];
                    console.log("index_item", index_problem)

                    if(index_problem != 0){
                        console.log("index_item", index_problem)
                        beforeItems = editShift.problems.slice(0, index_problem)
                    } 
                    const afterItems= editShift.problems.slice(+index_problem + 1, localState.shifts_data.length)

                    // edit item
                    editItem = {...editItem, solved: toggleValue}
                    const new_problems = beforeItems.concat(editItem).concat(afterItems)

                    // edit shift
                    editShift = {...editShift, problems: new_problems}

                    console.log("beforeShifts", beforeShifts)
                    console.log("editShift", editShift)
                    console.log("afterShifts", afterShifts)

                    const new_shifts = beforeShifts.concat(editShift).concat(afterShifts)

                    console.log("new_shifts", new_shifts)

                    let new_localState = {...localState, shifts_data: new_shifts}

                    return (new_localState)
                }
            }
        }
    }

    let shift_data  = localState.shifts_data.filter((element: any) =>{
        return element.shift_id === shift
    })
}


function updateItemFromState(item: Number, shift: Number, localState: any, toggleValue: boolean): any{
    // localState.shifts_data.map((element: any, index_shift: Number) => {
    for(let index_shift = 0; index_shift < localState.shifts_data.length; index_shift++){
        let element = localState.shifts_data[index_shift];
        if (element.shift_id === shift){
            for(let index_item = 0; index_item < element.items.length; index_item++){
                let data = element.items[index_item];
            // element.items.forEach((data: any, index_item: Number) =>{
                if (data.id === item){
                    // shifts
                    let shifts_data = localState.shifts_data;
                    let editShift = shifts_data[+index_shift] //copy the array
                    let beforeShifts: any[] = [];
                    if(+index_shift != 0){
                        beforeShifts = localState.shifts_data.slice(0, +index_shift)
                    } 
                    const afterShifts = localState.shifts_data.slice(+index_shift + 1, localState.shifts_data.length)

                    // items
                    let shift_items = editShift.items;
                    let editItem = editShift.items[+index_item] //copy the array
                    let beforeItems: any[] = [];
                    if(index_item != 0){
                        beforeItems = editShift.items.slice(0, +index_item)
                    } 
                    const afterItems= editShift.items.slice(+index_item + 1, localState.shifts_data.length)

                    // edit item
                    editItem = {...editItem, item_lost: toggleValue}
                    const new_items = beforeItems.concat(editItem).concat(afterItems)

                    // edit shift
                    editShift = {...editShift, items: new_items}
                    const new_shifts = beforeShifts.concat(editShift).concat(afterShifts)
                    let new_localState = {...localState, shifts_data: new_shifts}

                    console.log(new_localState)
                    return (new_localState)
                }
            }
        }
    }

    let shift_data  = localState.shifts_data.filter((element: any) =>{
        return element.shift_id === shift
    })
}