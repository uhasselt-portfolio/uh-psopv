import axios from "axios"
import Redux from 'redux';
import Database from '../../database/Database'
import {resetActionList, getActionList, addObjectToActionList, getDefaultSector, getUserId, setListLocalStorage} from './saveFunction'

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
        return -1
    }
    else if(a_data > b_data){
        return 1
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
    responseProblems: any, responsePlannings: any, default_sector: number){



        let posts_data: {}[] = []

        responsePosts.data.data.posts.map((post: any) => {
            posts_data.push({
                post_id: post.id,
                sector_id: post.sector_id,
                post_description: post.general_post.description,
                loc_description: post.title,
                loc_address: post.address,
                loc_lat: post.latitude,
                loc_lng: post.longitude,
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
        let sectors: any[] = []
        posts_data.map((post: any) => {
            if(!sectors.includes(post.sector_id)){
                sectors.push(post.sector_id)
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
 function getMessages(responseMessages: any, responseProblems: any, user_id: number, volunteers: any){

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

    return {messages: messages, problems: problems}
}

function getCurrentUserInfo(ResponseCurrentUser: any){
    let userinfo = ResponseCurrentUser.data.data.user;
    console.log(userinfo)

    return{email: userinfo.email, phone_number: userinfo.phone_number, first_name: userinfo.first_name,
        last_name: userinfo.last_name, permission_type: userinfo.permission_type.name, association: userinfo.association.name}


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

        const database = new Database();

        const responsePosts = await database.fetchPosts();
        const responseUnsolvedProblems = await database.fetchUnsolvedProblems();
        const responseItems = await database.fetchAllItems();
        const responseProblems = await database.fetchAllProblems();
        const responsePlannings = await database.fetchPlannings();
        const responseUsers = await database.fetchUsers();
        const user_id = await getUserId();
        const responseMessages = await database.fetchMessagesFrom(user_id);
        const default_sector = await getDefaultSector();
        const problemTypes = await database.fetchAllProblemTypes();
        const current_user = await database.fetchUserById(user_id);


        let volunteers =  getVolunteersFromSector(responsePlannings, default_sector);
        let nonVolunteers = getNonVolunteers(responseUsers, user_id);
        let postsData =  getPostsData(responsePosts, responseUnsolvedProblems, responseItems, responseProblems, responsePlannings, default_sector);
        let messages =  getMessages(responseMessages, responseProblems, user_id, volunteers);
        let user_info = getCurrentUserInfo(current_user);

        let message = messages.messages;
        let problems = messages.problems;
        message.sort(sortMessagesByDate);
        problems.sort(sortMessagesByDate);

        setListLocalStorage('my_volunteers', volunteers);
        setListLocalStorage('contacts', nonVolunteers);
        setListLocalStorage('posts', postsData.posts_data);
        setListLocalStorage('sectors', postsData.posts_sectors);
        setListLocalStorage('messages', message);
        setListLocalStorage('problems', problems);
        setListLocalStorage('problem_types', problemTypes.data.data.problemTypes);
        setListLocalStorage('user_info', user_info);


        resetActionList();
        dispatch({type: UNROLL_ACTIONS})

    } catch(error){
        console.log(error)
    }
}