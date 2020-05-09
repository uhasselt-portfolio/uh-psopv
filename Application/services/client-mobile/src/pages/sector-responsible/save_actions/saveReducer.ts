// import {SAVE_TOGGLE_ACTION} from './saveAction'

// // Initial State
export const savedState: any[] = ["test"];

// export default function (state = savedState, action : any) {
//     switch(action.type) {
//         case SAVE_TOGGLE_ACTION:
//             console.log("SAVE_TOGGLE_ACTION")
//             return
//         default:
//             console.log("NOPE ACTION", state)
//             console.log("NOPE ACTION2", action)

//             return state;
//     }
// }

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