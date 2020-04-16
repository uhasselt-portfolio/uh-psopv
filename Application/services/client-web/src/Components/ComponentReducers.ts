import {ComponentActions} from './ComponentActions';
import {AnyAction} from "redux";
import State, {initialState} from '../Redux/State';
import ProblemInterface from '../interfaces/ProblemDataInterface';

export default function (state : State = initialState, action : AnyAction) : State {
    switch(action.type) {
        case ComponentActions.PROBLEM_SOLVED_POST_START:
            return {...state, loading: true, isProblemSolvedPosted: false, errorMessage: ""}
        case ComponentActions.PROBLEM_SOLVED_POST_SUCCES:
            let otherProblems : ProblemInterface[] = state.problems.filter(problem => problem.id !== action.payload);
            let solvedProblem : ProblemInterface[]= state.problems.filter(problem => problem.id === action.payload);
            let newProblem : ProblemInterface = {
                ...solvedProblem[0],
                solved: true
            }
            return {...state, 
                    loading: false, 
                    isProblemSolvedPosted: true,
                    problems: [...otherProblems, newProblem],
                    errorMessage: ""}
        case ComponentActions.PROBLEM_SOLVED_POST_FAIL:
            return {...state, loading: false, isProblemSolvedPosted: false, errorMessage: action.payload}
        case ComponentActions.USER_FETCH_START:
            return {...state, loading: true, isUsersFetched: false, errorMessage: ""}
        case ComponentActions.USER_FETCH_SUCCES: 
            return {...state, loading: false, isUsersFetched: true, users: action.payload, errorMessage:""}
        case ComponentActions.USER_FETCH_FAIL:
            return {...state, loading: false, isUsersFetched: false, errorMessage: action.payload}      
        case ComponentActions.USER_POST_CONNECTION_CHANGED_START:
            return {...state, loading: true, isUserConnectionChanged: false, errorMessage: ""}
        case ComponentActions.USER_POST_CONNECTION_CHANGED_SUCCES: {
            return {
                ...state,
                loading:false,
                isUserConnectionChanged: true,
                users: action.payload,
                errorMessage: ""
            }
        }
        case ComponentActions.USER_POST_CONNECTION_CHANGED_FAIL:
            return {...state, loading: false, isUserConnectionChanged: false, errorMessage: action.payload}
        default:
            return state
    }
}