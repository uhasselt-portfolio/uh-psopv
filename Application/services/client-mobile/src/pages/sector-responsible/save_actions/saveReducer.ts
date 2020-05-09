import {SAVE_TOGGLE_ACTION, UNROLL_ACTIONS} from './saveAction'

// Initial State
export const savedState: any[] = [];

export default function (state = savedState, action : any) {
    switch(action.type) {
        case SAVE_TOGGLE_ACTION:
            console.log("SAVE_TOGGLE_ACTION", state)
            state.push(action.url)
            return state
        case UNROLL_ACTIONS:
            console.log("UNROLLED_ACTIONS", state)
            // state = []
            return state
        default:
            console.log("default savereducer", state)
            return state;
    }
}

// export default (state = savedState, action: any) => {
//     switch (action.type) {
//         // Append event to our events log
//         case SAVE_TOGGLE_ACTION:
//             savedState.push(action.url)
//             console.log("SAVE SAVE_TOGGLE_ACTION", savedState)
//             // return state.concat(action.payload);

//         default:
//             console.log("NOPE ACTION")
//             return state;
//     }
// };