import {POST_FETCH_PLANNING_FAIL, POST_FETCH_PLANNING_START, POST_FETCH_PLANNING_SUCCESS, ITEM_TOGGLE_FAIL, ITEM_TOGGLE_SUCCESS, ITEM_TOGGLE_START,
PROBLEM_TOGGLE_FAIL, PROBLEM_TOGGLE_START, PROBLEM_TOGGLE_SUCCESS} from "./PostAction";
import {AnyAction} from "redux";

import {initialState} from './States/localStorage'
import ShiftData from "./States/ShiftData";
import ShiftProblem from "./States/ShiftProblem";
import ShiftItem from "./States/ShiftItem";


export default function (state = {localState: initialState}, action : AnyAction) {
    switch(action.type) {
        case POST_FETCH_PLANNING_START:
            return {...state, loading: true, arePlanningsFormPostFetched: false, errorMessage: ""}
        case POST_FETCH_PLANNING_SUCCESS:
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
            return {...state, loading: false, arePlanningsFormPostFetched: false, errorMessage: action.payload}

        case ITEM_TOGGLE_START:
            return {...state, loading: true, isItemToggled: false, errorMessage: ""}
        case ITEM_TOGGLE_SUCCESS:
            console.log(action.payload, state)
            return {...state, loading: false, isItemToggled: action.payload, errorMessage: ""}
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