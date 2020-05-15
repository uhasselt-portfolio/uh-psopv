import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import MessageDataInterface from '../../interfaces/MessageDataInterface';
import Database from '../../Redux/Database';

export enum OverviewActions {
    OVERVIEW_FETCH_START = 'OVERVIEW_FETCH_STRART',
    OVERVIEW_FETCH_FAIL = 'OVERVIEW_FETCH_FAIL',
    OVERVIEW_PROBLEM_FETCH_SUCCES = 'OVERVIEW_PROBLEM_FETCH_SUCCES',
    OVERVIEW_MESSAGE_FETCH_SUCCES = 'OVERVIEW_MESSAGE_FETCH_SUCCES',
    OVERVIEW_FETCH_SUCCES = 'OVERVIEW_FETCH_SUCCES',
    OVERVIEW_POST_NEW_MESSAGE_SUCCES = 'OVERVIEW_POST_NEW_MESSAGE',
    OVERVIEW_POST_NEW_MESSAGE_FAIL = 'OVERVIEW_POST_NEW_MESSAFGE_FAIL',
    OVERVIEW_POST_NEW_MESSAGE_START = 'OVERVIEW_POST_NEW_MESSAGE_START',
    OVERVIEW_POST_MESSAGE_READ_SUCCES = 'OVERVIEW_MESSAGE_READ_SUCCES',
    OVERVIEW_FETCH_POSTS_START = 'OVERVIEW_GET_POSTS_START',
    OVERVIEW_FETCH_POSTS_SUCCES = 'OVERVIEW_GET_POSTS_SUCCES',
    OVERVIEW_FETCH_POSTS_FAIL = 'OVERVIEW_GET_POSTS_FAIL'
};

export const fetchProblems = () => async (dispatch : Redux.Dispatch) => {
    console.log("overview problem fetc");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const problems : ProblemDataInterface[] = await new Database().fetchProblems();

        dispatch({
            type: OverviewActions.OVERVIEW_PROBLEM_FETCH_SUCCES,
            payload: problems
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const fetchMessages = () => async (dispatch : Redux.Dispatch) => {
    console.log("overview messagesfetc");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const messages : MessageDataInterface[] = await new Database().fetchmessages();


        dispatch({
            type: OverviewActions.OVERVIEW_MESSAGE_FETCH_SUCCES,
            payload: messages
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const fetch = () => async (dispatch: Redux.Dispatch) => {
    console.log("overview fetch");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const state = await new Database().fetchAll();

        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_SUCCES,
            payload: {
                messages: state.messages,
                users: state.users,
                planning: state.planning,
                items: state.items,
                posts: state.posts,
                problems: state.problems
            }
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const postNewMessage = (receiver: Number,title: string, content: string, adminId: Number) => async (dispatch: Redux.Dispatch) => {
    console.log("post new message");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_POST_NEW_MESSAGE_START
        });

        const response = await new Database().postNewMessage(receiver,title,content,adminId);

        console.log(response);


        dispatch({
            type: OverviewActions.OVERVIEW_POST_NEW_MESSAGE_SUCCES,
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_POST_NEW_MESSAGE_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const postMessageRead = (messageId: Number) => async (dispatch: Redux.Dispatch) => {
    console.log("message read");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        await new Database().patchMessageRead(messageId);

        dispatch({
            type: OverviewActions.OVERVIEW_POST_MESSAGE_READ_SUCCES,
            payload: messageId
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}

export const fetchPosts = () => async (dispatch: Redux.Dispatch) => {
    console.log("in shift planning fetch");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_POSTS_START
        });

        let posts = await new Database().fetchPosts();

        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_POSTS_SUCCES,
            payload: posts
        })

    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: OverviewActions.OVERVIEW_FETCH_POSTS_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}