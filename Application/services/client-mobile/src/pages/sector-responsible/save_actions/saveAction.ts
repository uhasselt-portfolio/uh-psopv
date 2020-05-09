import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'



  

// export const doDatabase = (todoCommands: any) => async (dispatch: Redux.Dispatch) => {
//     try{
//         console.log("TODO", todoCommands)
//         // todoCommands.forEach(async (element: any) => {
//         //     console.log("toggled item", element)
//         //     const result = await axios.patch(element);
//         // });

//         // const response = await new Database().ItemToggle(item_id); // TODO GETUSERID

//     } catch(error){
//     }
// }

// export const SAVE_TOGGLE_ACTION = 'SAVE_TOGGLE_ACTION'

// export const OfflineItemToggle = (item_id: number) => async (dispatch: Redux.Dispatch) => {
//     try{
//         console.log("insde Action OfflineItemToggle")
//         dispatch({type: SAVE_TOGGLE_ACTION, url: 'https://psopv.herokuapp.com/api/item/toggle-lost/' + item_id})

//     } catch(error){
//         console.log("SAVE ACTION FAILED")
//     }
// }