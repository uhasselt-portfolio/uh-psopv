import axios from "axios"
import Redux from 'redux';
import Database from '../../../database/Database'
import { getDefaultSector } from "../../save/saveFunction";


export const PLANNING_FETCH_START = 'PLANNING_FETCH_START'
export const PLANNING_FETCH_SUCCESS = 'PLANNING_FETCH_SUCCESS'
export const PLANNING_FETCH_FAIL = 'PLANNING_FETCH_FAIL'

export const fetchPosts = () => async (dispatch: Redux.Dispatch) => {
    try{
        dispatch({type: PLANNING_FETCH_START})

        const responsePosts = await new Database().fetchPosts();

        
        let posts_data = responsePosts.data.data.posts

        // get all posts with problems
        let postsWithProblems: any[] = []
        const responseUnsolvedProblems = await new Database().fetchUnsolvedProblems();
        console.log(responseUnsolvedProblems)
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
            if(postsWithProblems.includes(post.id)){
                post["problem"] = true;
              } else{
                post["problem"] = false;
              }
        })
        let default_sector = await getDefaultSector();

        let all_data = {posts_data: posts_data, posts_sectors: sectors, default_sector: default_sector}

        console.log(all_data)
        dispatch({type: PLANNING_FETCH_SUCCESS, payload: all_data})
    } catch(error){
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PLANNING_FETCH_FAIL, payload: error.response.data.data.plannings})
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }
    }
}