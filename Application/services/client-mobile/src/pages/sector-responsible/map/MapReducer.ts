import {PROBLEM_POST_FETCH_FAIL, PROBLEM_POST_FETCH_START, PROBLEM_POST_FETCH_SUCCESS} from "./MapAction";
import {AnyAction} from "redux";

export default function (state = {}, action : AnyAction) {
    switch(action.type) {
        case PROBLEM_POST_FETCH_START:
            return {...state, loading: true, areProblemsAndPostsFetched: false, errorMessage: ""}
        case PROBLEM_POST_FETCH_SUCCESS:
                let posts = action.payload.posts
                let problems = action.payload.problems

                let problem_posts = []
                let good_posts = []
                for(var i = 0; i < posts.length; i++) {
                    let unsolved_problems = problems.filter( (problem: any) => 
                        problem.solved === false &&
                        problem.planning.post_id === posts[i].id
                    )

                    console.log(unsolved_problems)
                    if(unsolved_problems.length > 0) {
                        problem_posts.push(posts[i])
                    } else{
                        good_posts.push(posts[i])
                    }

                }

                let sorted_posts = {"problem_posts": problem_posts, "good_posts": good_posts}


            return {...state, loading: false, areProblemsAndPostsFetched: sorted_posts, errorMessage: ""}
        case PROBLEM_POST_FETCH_FAIL:
            return {...state, loading: false, areProblemsAndPostsFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}