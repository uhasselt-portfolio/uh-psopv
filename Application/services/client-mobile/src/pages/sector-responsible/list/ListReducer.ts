import {PLANNING_FETCH_FAIL, PLANNING_FETCH_START, PLANNING_FETCH_SUCCESS } from "./ListAction";
import {AnyAction} from "redux";

import {initialState} from '../States/localStorage'

console.log(initialState)

export default function (state = {localState: initialState.Posts}, action : AnyAction) {
    switch(action.type) {
        case PLANNING_FETCH_START:
            return {...state, loading: true, arePostsFetched: false, errorMessage: ""}
        case PLANNING_FETCH_SUCCESS:
            console.log("state.localstate",action.payload)

            let posts: any[] = []
            action.payload.posts_data.forEach((data: any) => {
                let post = {
                    id: data.id,
                    title: data.title,
                    address: data.address,
                    latitude: data.latitude,
                    longitude: data.longitude,
                    radius: data.radius,
                    sector_id: data.sector_id,
                    problem: data.problem}
                posts.push(post)                
            });
            
            let sectors = action.payload.posts_sectors
            let localState = {posts_sectors: sectors, posts_data: posts, default_sector: action.payload.default_sector}

            return {...state,
                localState: localState,
                loading: false,
                arePostsFetched: action.payload, 
                errorMessage: ""}
        case PLANNING_FETCH_FAIL:
            return {...state, loading: false, arePostsFetched: false, errorMessage: action.payload}
        default:
            return state
    }
}