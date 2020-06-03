import Redux from 'redux';
import Database from '../../database/Database'
import {getActionList, setListLocalStorage, getListLocalStorage, resetActionList, ConcatListToActionList} from './saveFunction'
import Auth from "../../utils/Auth";
import { Plugins } from '@capacitor/core';
const { LocalNotifications } = Plugins;

/**
 * Created by: Maria Hendrikx
 */

function sortPlanningsByDate(a: any, b: any){
    var a_data = new Date(a.shift.begin)
    var b_data = new Date(b.shift.begin)

    if(a_data < b_data){
        return -1
    }
    else if(a_data > b_data){
        return 1
    } else{
        return 0
    }
}

function sortUserShifts(a: any, b: any){
    var shift_begin_a = new Date(a.shift_start)
    var shift_begin_b = new Date(b.shift_start)

    if(shift_begin_a < shift_begin_b){
        return -1
    }
    else if(shift_begin_a > shift_begin_b){
        return 1
    } else{
        return 0
    }
}
function sortMessagesByDate(a: any, b: any){
    var a_data = new Date(a.created_at)
    var b_data = new Date(b.created_at)

    if(a_data < b_data){
        return 1
    }
    else if(a_data > b_data){
        return -1
    } else{
        return 0
    }
}
 function getVolunteersFromSector(responsePlannings: any, default_sector: number){

    let users = responsePlannings.data.data.plannings.filter((element: any) => {
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
 function getNonVolunteers(responseUsers: any, user_id: number){
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

        if(!done_workers.includes(user.id) && worker.function_type != "Vrijwilliger" && worker.user_id !== user_id){
            done_workers.push(user.id);
            workers.push(worker)
        }
    })

    return workers;
}
 function getPostsData(responsePosts: any, responseUnsolvedProblems: any, responseItems: any,
    responseProblems: any, responsePlannings: any, default_sector: number, list_colors: string[]){
        let posts_data: {}[] = []

        responsePosts.data.data.posts.map((post: any) => {
            posts_data.push({
                post_id: post.id,
                sector_id: post.sector_id,
                post_description: post.general_post.description,
                loc_description: post.title,
                loc_address: post.address,
                latitude: post.latitude,
                longitude: post.longitude,
                loc_radius: post.radius,
            })
        })

        // get all posts with problems
        let postsWithProblems: any[] = []
        responseUnsolvedProblems.data.data.problems.map((problem: any) => {
            if(!postsWithProblems.includes(problem.planning.post_id)){
                postsWithProblems.push(problem.planning.post_id)
            }
        })


        // make list of sectors
        let colorindex = 0;
        let sectors: any[] = []
        let sectors_number: number[] = [];

        posts_data.map((post: any, index: number) => {
            if(!sectors_number.includes(post.sector_id)){
                sectors_number.push(post.sector_id)
                sectors.push({sector_id: post.sector_id, color: list_colors[colorindex]})
                if(colorindex < list_colors.length - 1){
                    colorindex++;
                }
            }

            // add param "problem"
            if(postsWithProblems.includes(post.post_id)){
                post["problem"] = true;
              } else{
                post["problem"] = false;
              }
        })

        // get shifts
        posts_data.forEach((plannings: any) => {
            let plannings_post = responsePlannings.data.data.plannings.filter((planning: any) => {
                return planning.post_id === plannings.post_id
            });

            /* Add all Same shift together */
            const shifts: any[] = []; // array with shift_id's
            plannings_post.forEach((element: any) => {
                if(!shifts.includes(element.shift_id)){
                    shifts.push(element.shift_id)
                }
            });

            const userShifts: any[] = [];
            shifts.forEach((shift_id: number) => {
                let sameShift = plannings_post.filter((element: any) => {
                    return element.shift_id === shift_id
                });

                // Get relevant info
                let shifts_data = {
                    shift_id: sameShift[0].shift.id,
                    shift_begin: sameShift[0].shift.begin,
                    shift_end: sameShift[0].shift.end,
                }



                /* Add User Names */
                let userNames: any[] = [];
                sameShift.forEach((element: any) => {
                    const name = element.user.first_name + " " + element.user.last_name
                    userNames.push({name: name, user_id: element.user.id, phone_number: element.phone_number, email: element.email, planning_id: element.id})
                })

                /* Add items */
                let items: any[] = [];
                sameShift.forEach((planning: any) => {
                    let new_items = responseItems.data.data.items.filter((item: any) => {
                        return item.planning_id === planning.id
                    });

                    new_items.forEach((element: any, index: number) => {
                        items.push({
                            item_id: element.id,
                            item_lost: element.item_lost,
                            item_name: element.item_type.name,
                            item_from: element.planning.user.first_name
                        })
                    });
                })

                /* Add problems */
                let problems: any[] = [];
                sameShift.forEach((planning: any) => {
                    let new_problems = responseProblems.data.data.problems.filter((problem: any) => {
                        return problem.planning_id === planning.id
                    });

                    new_problems.forEach((element: any, index: number) => {
                        problems.push({
                            problem_id: element.id,
                            problem_solved: element.solved,
                            problem_title: element.problem_type.title,
                            problem_description: element.problem_type.description,
                            problem_priority: element.problem_type.priority,
                            created_at:element.created_at,
                            created_by_name: element.created_by.first_name + " " + element.created_by.last_name,
                            created_by_phone_number: element.created_by.phone_number,
                            created_by_email: element.created_by.email
                        })
                    });
                })

                userShifts.push({
                    shift_id: shift_id,
                    shift_start: shifts_data.shift_begin,
                    shift_end: shifts_data.shift_end,
                    shift_users: userNames,shift_items: items, shift_problems: problems});
            })

            userShifts.sort(sortUserShifts)

            plannings["shifts"] = userShifts;
        })

        let all_data = {posts_data: posts_data, posts_sectors: sectors, default_sector: default_sector};
        return all_data;
}
 function getMessages(responseMessages: any){
    let messages: any[] = []
    responseMessages.data.data.messages.forEach((message: any) => {
        messages.push({
            type: "Message",
            id: message.id,
            title: message.title,
            message: message.message,
            created_by: message.created_by.first_name,
            created_by_permission_type: message.created_by.permission_type.name,
            created_at: message.created_at,
            solved: message.seen
        })
    })

    messages.sort(sortMessagesByDate);

    return messages
}

function getProblems(responseProblems: any, volunteers: any){
    let my_volunteers: Number[] = []
    volunteers.map((volunteer: any) => {
        my_volunteers.push(volunteer.user_id)
    })

    let problems: any[] = []
    responseProblems.data.data.problems.forEach((problem: any) => {
        if(my_volunteers.includes(problem.planning.user_id)){
            problems.push({
                type: "Problem",
                id: problem.id,
                title: problem.problem_type.title,
                message: problem.problem_type.description,
                created_by: problem.created_by.first_name,
                created_by_permission_type: problem.created_by.permission_type.name,
                created_at: problem.created_at,
                solved: problem.solved,
                post_id: problem.planning.post_id,
                shift_id: problem.planning.shift_id,
                sector_id: problem.planning.post.sector_id
            })
        }
    })

    problems.sort(sortMessagesByDate);

    return problems

}

function generateSectorColors(sectors: number[], sectorColors: any){
    let colors: { sector_id: number; color: string; }[] = []
    let list_colors = ["green", "blue", "purple", "red", "darkblue", "darkred", "orange", "black"]
    // if(sectorColors.length <= 0){
        sectors.map((sector: number, index: number) => {
            colors.push({sector_id: sector, color:list_colors[index]})
        })
    // }
    return colors;
}

function getMyManagers(managers: any){
    let my_managers: any[] = [];
    managers.map((manager: any) => {
        my_managers.push({
            user_id: manager.user.id,
            user_name: manager.user.first_name + " " + manager.user.last_name
        })
    })

    return my_managers
}

function getTotalUnreadMessages(problems: any, messages: any){
    problems = problems.filter((problem: any) => {
        return(problem.solved == false)
    })

    messages = messages.filter((message: any) => {
        return(message.solved == false)
    })

    return problems.length + messages.length
}
function getActivePlanning(data_current: any){
    let current_planning = {
        id: data_current.id,
        user_id: data_current.user_id,
        shift_id: data_current.shift_id,
        post_id: data_current.post_id,
        sector_id: data_current.post.sector_id,
        checked_in: data_current.checked_in,
        user_name: data_current.user.first_name + " " + data_current.user.last_name,
        latitude: data_current.post.latitude,
        longitude: data_current.post.longitude,
        radius: data_current.post.radius,
        post_address: data_current.post.address,
        post_title: data_current.post.title,
        post_description: data_current.post.general_post.description,
        plan_name: data_current.post.general_post.name,
        shift_begin: data_current.shift.begin,
        shift_end: data_current.shift.end,
        shift_name: data_current.shift.name
    }
    return current_planning
}
function getPlanningsFromVolunteer(data_future: any){
    let future_plannings: { id: number; user_id: number; shift_id: number; post_id: number; sector_id: number;
        checked_in: boolean; user_name: string; latitude: number; longitude: number; radius: number; post_address: string;
        post_title: string; post_description: string; plan_name: string; shift_begin: any; shift_end: any; shift_name: string; }[] = []

    data_future.sort(sortPlanningsByDate)
    data_future.map((plan: any) => {
        future_plannings.push({
            id: plan.id,
            user_id: plan.user_id,
            shift_id: plan.shift_id,
            post_id: plan.post_id,
            sector_id: plan.post.sector_id,
            checked_in: plan.checked_in,
            user_name: plan.user.first_name + " " + plan.user.last_name,
            latitude: plan.post.latitude,
            longitude: plan.post.longitude,
            radius: plan.post.radius,
            post_address: plan.post.address,
            post_title: plan.post.title,
            post_description: plan.post.general_post.description,
            plan_name: plan.post.general_post.name,
            shift_begin: plan.shift.begin,
            shift_end: plan.shift.end,
            shift_name: plan.shift.name
        })
    })

    return future_plannings
}

export const UNROLL_ACTIONS = 'UNROLL_ACTIONS'

export const doDatabase = () => async (dispatch: Redux.Dispatch) => {
    try{
        const database = new Database();
        const todoCommands = await getActionList();

        let todo_amount = todoCommands.length;
        for(let i = 0; i < todo_amount; i++){
            try{
                let element: any = todoCommands.pop();
            
                if(element.id == undefined){
                    const result = await database.postRequest(element.url, element.params);
                } else{
                    const result = await database.patchRequest(element.url, element.id, element.params);
                }

                if(todoCommands.length < 1){
                    await resetActionList();
                } else{
                    await resetActionList();
                    await ConcatListToActionList(todoCommands);
                }

            } catch(error){
                console.log(error)
            }
        }

        

        const user_id = Auth.getAuthenticatedUser().id;

        const responseMessages = await database.fetchMessagesFrom(user_id);

        let messages =  getMessages(responseMessages);
        setListLocalStorage('messages', messages);

        // 1 = vrijwilliger
        if(Auth.getAuthenticatedUser().permission_type_id === 1){
            const responsePlanning =  await database.fetchActivePlanning(user_id);
            const responsePlannings =  await database.fetchPlanningsWithUserId(user_id);
            const responseSectors =  await database.fetchMyManager(user_id);
            let my_managers = getMyManagers(responseSectors.data.data.sectors);
            let plannings = getPlanningsFromVolunteer(responsePlannings.data.data.plannings);
            let activePlanning = getActivePlanning(responsePlanning.data.data.planning);
            setListLocalStorage('plannings', plannings);
            setListLocalStorage('active_planning', activePlanning);
            setListLocalStorage('my_managers', my_managers);
        }

        // 2 = sector_verantwoordelijke
        if(Auth.getAuthenticatedUser().permission_type_id === 2){
            const responsePosts = await database.fetchPosts();
            const responseUnsolvedProblems = await database.fetchUnsolvedProblems();
            const responseItems = await database.fetchAllItems();
            const responseProblems = await database.fetchAllProblems();
            const responsePlannings = await database.fetchPlannings();
            const responseUsers = await database.fetchUsers();
            const responseSector = await database.fetchSectorOfUser(user_id);
            const default_sector = responseSector.data.data.sector.id

            const problemTypes = await database.fetchAllProblemTypes();
            const sectorColors = await getListLocalStorage('sector_colors');

            let list_colors = ["#696969", "#bada55", "#7fe5f0", "#ff80ed", "#0050EF", "#407294", "#cbcba9", "#5ac18e"]

            let volunteers =  getVolunteersFromSector(responsePlannings, default_sector);
            let nonVolunteers = getNonVolunteers(responseUsers, user_id);
            let postsData =  getPostsData(responsePosts, responseUnsolvedProblems, responseItems, responseProblems,
                responsePlannings, default_sector, list_colors);
            let problems =  getProblems(responseProblems, volunteers);
            let sector_colors = generateSectorColors(postsData.posts_sectors, sectorColors);
            let total_msg = getTotalUnreadMessages(problems, messages)

            if(sector_colors.length > 0){
                setListLocalStorage('sector_colors', sector_colors);
            }
            setListLocalStorage('total_msg', total_msg);
            setListLocalStorage('my_volunteers', volunteers);
            setListLocalStorage('default_sector', default_sector);
            setListLocalStorage('contacts', nonVolunteers);
            setListLocalStorage('posts', postsData.posts_data);
            setListLocalStorage('sectors', postsData.posts_sectors);
            setListLocalStorage('problems', problems);
            setListLocalStorage('problem_types', problemTypes.data.data.problemTypes);
        }

        dispatch({type: UNROLL_ACTIONS})
    } catch(error){
        console.log(error.message)
    }
}


/**
 * Created by: Maria Hendrikx
 */
export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'
export const updateMessages = () => async (dispatch: Redux.Dispatch) => {
    try{
        const database = new Database();

        const user_id = Auth.getAuthenticatedUser().id;
        let old_messages = await getListLocalStorage('messages');
        const responseMessages = await database.fetchMessagesFrom(user_id);
        let messages =  getMessages(responseMessages);
        setListLocalStorage('messages', messages);

        let msg_notifications = [];
        // see if there are new message
        if(messages.length != old_messages.length){
            for(let i = 0; i < messages.length; i++){
                let search_message = messages[i];
                let new_check = old_messages.find((element: any) => {
                    return search_message.id == element.id
                })

                if(new_check == undefined){
                    msg_notifications.push(search_message)
                }
            }
        }

        msg_notifications.map(async (msg: any) => {
            const notifs = await LocalNotifications.schedule({
                notifications: [
                  {
                    title: msg.title,
                    body: msg.message,
                    id: msg.id,
                    schedule: { at: new Date(Date.now() + 1000 * 5) },
                    actionTypeId: "",
                    extra: null
                  }
                ]
              });
        })


        // problems
        const responseProblems = await database.fetchAllProblems();
        let volunteers = await getListLocalStorage('my_volunteers');
        let problems =  getProblems(responseProblems, volunteers);
        let old_problems = await getListLocalStorage('problems');
        setListLocalStorage('problems', problems);

        let problem_notifications: any[] = [];
        // see if there are new message
        if(problems.length != old_problems.length){
            for(let i = 0; i < problems.length; i++){
                let search_message = problems[i];
                let new_check = old_problems.find((element: any) => {
                    return search_message.id == element.id
                })

                if(new_check == undefined){
                    problem_notifications.push(search_message)
                }
            }
        }

        problem_notifications.map(async (msg: any) => {
            const notifs = await LocalNotifications.schedule({
                notifications: [
                  {
                    title: msg.title,
                    body: msg.mesasge,
                    id: msg.id,
                    schedule: { at: new Date(Date.now() + 1000 * 5) },
                    actionTypeId: "",
                    extra: null
                  }
                ]
              });
        })


        dispatch({type: UPDATE_MESSAGES})

    } catch(error){
        console.log(error)
    }
}