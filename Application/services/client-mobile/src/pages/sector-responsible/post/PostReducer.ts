import {POST_FETCH_PLANNING_FAIL, POST_FETCH_PLANNING_START, POST_FETCH_PLANNING_SUCCESS, ITEM_TOGGLE_FAIL, ITEM_TOGGLE_SUCCESS, ITEM_TOGGLE_START,
PROBLEM_TOGGLE_FAIL, PROBLEM_TOGGLE_START, PROBLEM_TOGGLE_SUCCESS} from "./PostAction";
import {AnyAction} from "redux";

import {initialState} from './States/localStorage'
import ShiftData from "./States/ShiftData";
import ShiftProblem from "./States/ShiftProblem";
import ShiftItem from "./States/ShiftItem";
import { toggle } from "ionicons/icons";


export default function (state = {localState: initialState}, action : AnyAction) {
    switch(action.type) {
        case POST_FETCH_PLANNING_START:
            console.log("item_POST_FETCH_PLANNING_STARTtoggle_start")
            return {...state, loading: true, arePlanningsFormPostFetched: false, errorMessage: ""}
        case POST_FETCH_PLANNING_SUCCESS:
            console.log("POST_FETCH_PLANNING_SUCCESS")

            let shifts_data: ShiftData[] = []

            action.payload.forEach((data: any) => {
                let t_users = data.shift_users
                let t_problems: ShiftProblem[] = []
                let t_items: ShiftItem[] = []

                data.shift_problems.forEach((data_problem: any) => {
                    let problem: ShiftProblem = {
                        id: data_problem.id,
                        solved: data_problem.solved,
                        title: data_problem.problem_type.title,
                        description: data_problem.problem_type.description,
                        priority: data_problem.problem_type.priority,
                        created_at: data_problem.created_at,
                        created_by: data_problem.problem_type.created_by,
                        user: data_problem.planning.user.first_name + " " +data_problem.planning.user.last_name
                    }

                    t_problems.push(problem)
                })

                data.shift_items.forEach((data_item: any) => {
                    let item: ShiftItem = {
                        id: data_item.id,
                        item_lost: data_item.item_lost,
                        name: data_item.item_type.name,
                        user: data_item.planning.user.first_name + " " +data_item.planning.user.last_name
                    }
                    t_items.push(item)
                })
                    
                let planning_data = data.shift_data[0]
                let shift_data: ShiftData = {
                    sector_id: planning_data.post.sector_id,
    
                    post_id: planning_data.post.id,
                    title: planning_data.post.title,
                    address: planning_data.post.address,
                    latitude: planning_data.post.latitude,
                    longitude: planning_data.post.longitude,
                    radius: planning_data.post.radius,
                
                    shift_id: data.shift_id,
                    shift_begin: planning_data.shift.begin,
                    shift_end: planning_data.shift.end,
                
                    users: t_users,
                    items: t_items,
                    problems: t_problems
                }
    
                shifts_data.push(shift_data)
            });

            let localState = {shifts_data: shifts_data}

            return {...state,
                localState: localState,
                loading: false,
                arePlanningsFormPostFetched: action.payload,
                errorMessage: ""}
        case POST_FETCH_PLANNING_FAIL:
            console.log("POST_FETCH_PLANNING_FAIL")
            return {...state, loading: false, arePlanningsFormPostFetched: false, errorMessage: action.payload}

            
        case ITEM_TOGGLE_START:
            return {...state, loading: true, isItemToggled: false, errorMessage: ""}
        case ITEM_TOGGLE_SUCCESS:
            let new_localstate: any = updateItemFromState(action.payload.item_id, action.payload.shift_id, state.localState, action.payload.toggleValue)            
            return {...state, localState: new_localstate, loading: false, isItemToggled: action.payload, errorMessage: ""}
        case ITEM_TOGGLE_FAIL:
            return {...state, loading: false, isItemToggled: false, errorMessage: action.payload}


        case PROBLEM_TOGGLE_START:
            return {...state, loading: true, isProblemToggled: false, errorMessage: ""}
        case PROBLEM_TOGGLE_SUCCESS:
            return {...state, loading: false, isProblemToggled: action.payload, errorMessage: ""}
        case PROBLEM_TOGGLE_FAIL:
            return {...state, loading: false, isProblemToggled: false, errorMessage: action.payload}
        default:
            return state
    }
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
                    const beforeShifts: any[] = [];
                    if(+index_shift != 0){
                        const beforeShifts = localState.shifts_data.slice(0, +index_shift)
                    } 
                    const afterShifts = localState.shifts_data.slice(+index_shift + 1, localState.shifts_data.length)

                    // items
                    let shift_items = editShift.items;
                    let editItem = editShift.items[+index_item] //copy the array
                    let beforeItems: any[] = [];
                    if(index_item != 0){
                        console.log(beforeItems)
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

                    return (new_localState)
                }
            }
        }
    }

    let shift_data  = localState.shifts_data.filter((element: any) =>{
        return element.shift_id === shift
    })

}