import axios from "axios"
import Redux from 'redux';
import Database from '../../database/Database'
import {resetActionList, getActionList, addObjectToActionList, getDefaultSector, getUserId, setListLocalStorage} from './saveFunction'


async function getVolunteersFromSector(default_sector: number){
    const responsePlanning = await new Database().fetchPlannings();

    let users = responsePlanning.data.data.plannings.filter((element: any) => {
        return element.post.sector_id == default_sector;
    });

    let volunteers: any[] = []
    let done_volunteers: Number[] = [];
    users.map((user : any ) => {
        const name = user.user.first_name + " " + user.user.last_name;
        let volunteer = {user_id: user.user.id,
            name: name,
            phone_number: user.user.phone_number,
            email: user.user.email,
            function_type: user.user.permission_type.name
        }
        if(!done_volunteers.includes(user.user.id) && volunteer.function_type == "Vrijwilliger"){
            done_volunteers.push(user.user.id);
            volunteers.push(volunteer)
        }
    })

    return volunteers
}
async function getNonVolunteers(){
    const responseUsers = await new Database().fetchUsers();
    const user_id = await getUserId();

    let workers: any[] = []
    let done_workers: Number[] = [];
    responseUsers.data.data.users.map((user: any) => {

        const name = user.first_name + " " + user.last_name;
        let worker = {user_id: user.id,
            name: name,
            phone_number: user.phone_number,
            email: user.email,
            function_type: user.permission_type.name
        }

        if(!done_workers.includes(user.id) && worker.function_type != "Vrijwilliger"){
            done_workers.push(user.id);
            workers.push(worker)
        }
    })

    return workers;
}


export const UNROLL_ACTIONS = 'UNROLL_ACTIONS'  

export const doDatabase = (todoCommands: any) => async (dispatch: Redux.Dispatch) => {
    try{
        todoCommands.forEach(async (element: any) => {
            if(element.params != null){
                    const result = await axios.post(element.url, element.params);
            } else{
                    const result = await axios.patch(element.url);
            }
        });

        const default_sector = await getDefaultSector();
        let volunteers = await getVolunteersFromSector(default_sector);
        let nonVolunteers = await getNonVolunteers();

        setListLocalStorage('my_volunteers', volunteers);
        setListLocalStorage('contacts', nonVolunteers);

        resetActionList();
        dispatch({type: UNROLL_ACTIONS})

    } catch(error){
    }
}