import {UNROLL_ACTIONS} from './saveAction'




export default function (state: any, action : any) {
    switch(action.type) {
        case UNROLL_ACTIONS:
            console.log("UNROLLED_ACTIONS", state)
            return true
        default:
            return true
    }
}