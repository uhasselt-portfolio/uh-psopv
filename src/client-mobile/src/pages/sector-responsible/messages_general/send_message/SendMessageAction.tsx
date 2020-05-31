import Redux from 'redux';
import { getListLocalStorage, ConcatListToActionList, setListLocalStorage } from "../../../save/saveFunction";
import Auth from "../../../../utils/Auth";

export const MESSAGE_ADD_START = 'MESSAGE_ADD_START'
export const MESSAGE_ADD_SUCCESS = 'MESSAGE_ADD_SUCCESS'
export const MESSAGE_ADD_FAIL = 'MESSAGE_ADD_FAIL'

export const messageAddMessage = (
    title: string | undefined,
    message: string | undefined,
    priority: number) => async (dispatch: Redux.Dispatch) => {
    try{
        let created_by_id = Auth.getAuthenticatedUser().id
        let send_to_list = await getListLocalStorage('send_msg')

        let function_list:  any[] = [];

        send_to_list.forEach(async (send_to_id_string: string) => {
            let send_to_id = Number(send_to_id_string)
            let params = {
                title: title,
                message: message,
                created_by_id: created_by_id,
                send_to_id: Number(send_to_id),
                priority: priority,
            }

            function_list = [...function_list, {url: '/message/add', id: undefined , params: params}]
        })

        ConcatListToActionList(function_list);

        dispatch({type: MESSAGE_ADD_SUCCESS})
    } catch(error){
        console.log(error)
    }
}

export const USERS_FETCH_SUCCESS = 'USERS_FETCH_SUCCESS'

export const fetchUsers = () => async (dispatch: Redux.Dispatch) => {
    try{
        // 1 = vrijwilliger
        if(Auth.getAuthenticatedUser().permission_type_id == 1){
            let managers = await getListLocalStorage('my_managers');
            if(managers.length > 0){
                await setListLocalStorage('send_msg', [managers[0].user_id])
            }
            dispatch({type: USERS_FETCH_SUCCESS, payload: {managers: managers}})
        } else{
            let volunteers = await getListLocalStorage('my_volunteers');
            let nonVolunteers = await getListLocalStorage('contacts');
            let checkboxList = await initCheckboxList(volunteers, nonVolunteers);
            dispatch({type: USERS_FETCH_SUCCESS, payload: {my_volunteers: volunteers, contacts: nonVolunteers, checkboxList: checkboxList}})
        }
    
    } catch(error){
        console.log(error)
        dispatch({type: USERS_FETCH_SUCCESS, payload: {my_volunteers: [], contacts: [], checkboxList: []}})
    }
}

async function initCheckboxList(volunteers: any, nonVolunteers: any){
    let list: any[] = nonVolunteers.concat(volunteers);
    let list_checked = await getListLocalStorage('send_msg');
    let checked = false;
    let check_list: any[] = [];

    list.map((element: any, index: number) => {
      let item_status = list_checked.find((id: number) => {
        return id == element.user_id
      })

      if(item_status == element.user_id){
        checked = true;
      }
      
      let item = {checked: checked, value_id: Number(element.user_id), value_name: element.name, value_function_type: element.function_type}
      check_list.push(item);
    });


    return check_list;
  }