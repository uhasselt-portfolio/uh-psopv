import axios from 'axios';
import Redux from 'redux';
import PostDataInterface from '../../interfaces/PostDataInterface';

export enum PostActions {
    POST_FETCH_START = 'POST_FETCH_STRART',
    POST_FETCH_SUCCES = 'POST_FETCH_SUCCES',
    POST_FETCH_FAIL = 'POST_FETCH_FAIL'
};

export const fetchPosts = () => async (dispatch : Redux.Dispatch) => {
    console.log("in planning fetch");
    try {
        dispatch({
            type: PostActions.POST_FETCH_START
        });

        const response = await axios.get('http://localhost/api/post/fetch/all');

        let posts: PostDataInterface[] = [];
        for (let i = 0; i < response.data.data.posts.length; ++i) {
            posts.push({
                id: response.data.data.posts[i].id,
                title: response.data.data.posts[i].title,
                addres: response.data.data.posts[i].address,
                sector: response.data.data.posts[i].sector_id,
                general: response.data.data.posts[i].general_post.name,
                latitude: response.data.data.posts[i].latitude,
                longitude: response.data.data.posts[i].longitude
            })
        }

        dispatch({
            type: PostActions.POST_FETCH_SUCCES,
            payload: posts
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: PostActions.POST_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}