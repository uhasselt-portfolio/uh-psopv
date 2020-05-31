import {UNROLL_ACTIONS, UPDATE_MESSAGES} from './saveAction'




export default function (state: any, action : any) {
    switch(action.type) {
        case UNROLL_ACTIONS:
            console.log("UNROLLED_ACTIONS", state)
            return true
        case UPDATE_MESSAGES:
            console.log("UPDATE_MESSAGES", state)
            return true
        default:
            return true
    }
}