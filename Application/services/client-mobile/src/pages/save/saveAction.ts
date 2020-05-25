import axios from "axios"
import Redux from 'redux';
import Database from '../../database/Database'
import {resetActionList, getActionList, addObjectToActionList, getDefaultSector, setListLocalStorage, getListLocalStorage} from './saveFunction'
import { push } from "ionicons/icons";
import Auth from "../../utils/Auth";

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

        if(!done_workers.includes(user.id) && worker.function_type != "Vrijwilliger"){
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
                colorindex++;
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
        if(my_volunteers.includes(problem.planning.user.id)){
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

export const UNROLL_ACTIONS = 'UNROLL_ACTIONS'

export const doDatabase = () => async (dispatch: Redux.Dispatch) => {
    try{
        const todoCommands = await getActionList();

        todoCommands.forEach(async (element: any) => {
            if(element.params != null){
                    const result = await axios.post(element.url, element.params);
            } else{
                    const result = await axios.patch(element.url);
            }
        });

        const database = new Database();

        const user_id = Auth.getAuthenticatedUser().id;
        const responseMessages = await database.fetchMessagesFrom(user_id);
        let messages =  getMessages(responseMessages);
        setListLocalStorage('messages', messages);

                // 1 = sector_verantwoordelijke
        if(Auth.getAuthenticatedUser().permission_type_id == 1){
            const response =  await database.fetchPlanningsWithUserId(user_id);
            let plannings = response.data.data.plannings;
            plannings.sort(sortPlanningsByDate)
            console.log("SAVE ACTION PLANNING", plannings);
            setListLocalStorage('plannings', plannings);
        }
        // 2 = sector_verantwoordelijke
        if(Auth.getAuthenticatedUser().permission_type_id == 2){
            const responsePosts = await database.fetchPosts();
            const responseUnsolvedProblems = await database.fetchUnsolvedProblems();
            const responseItems = await database.fetchAllItems();
            const responseProblems = await database.fetchAllProblems();
            const responsePlannings = await database.fetchPlannings();
            const responseUsers = await database.fetchUsers();
            const default_sector = await getDefaultSector();
            const problemTypes = await database.fetchAllProblemTypes();
            const sectorColors = await getListLocalStorage('sector_colors');

            let list_colors = ["#696969", "#bada55", "#7fe5f0", "#ff80ed", "#0050EF", "#407294", "#cbcba9", "#5ac18e"]

            let volunteers =  getVolunteersFromSector(responsePlannings, default_sector);
            let nonVolunteers = getNonVolunteers(responseUsers, user_id);
            let postsData =  getPostsData(responsePosts, responseUnsolvedProblems, responseItems, responseProblems,
                responsePlannings, default_sector,list_colors);
            let problems =  getProblems(responseProblems, volunteers);
            let sector_colors = generateSectorColors(postsData.posts_sectors, sectorColors);


            if(sector_colors.length > 0){
                setListLocalStorage('sector_colors', sector_colors);
            }
            setListLocalStorage('my_volunteers', volunteers);
            setListLocalStorage('contacts', nonVolunteers);
            setListLocalStorage('posts', postsData.posts_data);
            setListLocalStorage('sectors', postsData.posts_sectors);
            setListLocalStorage('problems', problems);
            setListLocalStorage('problem_types', problemTypes.data.data.problemTypes);
        }



        resetActionList();
        dispatch({type: UNROLL_ACTIONS})

    } catch(error){
        console.log(error)
    }
}

export const UPDATE_MESSAGES = 'UPDATE_MESSAGES'

export const updateMessages = () => async (dispatch: Redux.Dispatch) => {
    try{
        const database = new Database();

        const user_id = Auth.getAuthenticatedUser().id;
        const responseMessages = await database.fetchMessagesFrom(user_id);
        let messages =  getMessages(responseMessages);
        setListLocalStorage('messages', messages);

        dispatch({type: UPDATE_MESSAGES})

    } catch(error){
        console.log(error)
    }
}