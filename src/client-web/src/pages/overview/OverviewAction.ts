import Redux from 'redux';
import ProblemDataInterface from '../../interfaces/ProblemDataInterface';
import MessageDataInterface from '../../interfaces/MessageDataInterface';
import Database from '../../Redux/Database';
import Auth from '../../utils/Auth';

/**
 * @author Wouter Grootjans
 */
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

/**
 * gets all the problems from the database and updates the redux state
 */
export const fetchProblems = (amount: number) => async (dispatch : Redux.Dispatch) => {
    console.log("overview problem fetc");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const problems : ProblemDataInterface[] = await new Database().fetchProblemsSubset(amount);

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

/**
 * gets all the messages from the database and updates the redux state
 */
export const fetchMessages = () => async (dispatch : Redux.Dispatch) => {
    console.log("overview messagesfetc");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_FETCH_START
        });

        const messages : MessageDataInterface[] = await new Database().fetchMessages();


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

/**
 * getss all the messages, users, items, posts, problems and the planning/shifts from the database and updates the redux state
 */
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

/**
 * inserts the new message into the database
 * @param receiver the id of the receiver of the message
 * @param title the title of the message
 * @param content the content of the message    
 * @param adminId the id of the sender always the admin
 */
export const postNewMessage = (receiver: Number,title: string, content: string) => async (dispatch: Redux.Dispatch) => {
    console.log("post new message");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_POST_NEW_MESSAGE_START
        });

        let adminId : number = Auth.getAuthenticatedUser().id;
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
/**
 * inserts the new messages into the database
 * @param receiverIds the ids of the receivers
 * @param title the title of the message
 * @param content the content of the message
 * @param adminId the id of the sender always the admin
 */
export const postNewMessages = (receiverIds: number[],title: string, content: string) => async (dispatch: Redux.Dispatch) => {
    console.log("post new messages");
    try {
        dispatch({
            type: OverviewActions.OVERVIEW_POST_NEW_MESSAGE_START
        });

        let adminId : number = Auth.getAuthenticatedUser().id;

        const response = await new Database().postNewMessageMulitple(receiverIds,title,content,adminId);

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

/**
 * updatest the database that the message has been read
 * @param messageId the id of the message
 */
export const postMessageRead = (messageId: number) => async (dispatch: Redux.Dispatch) => {
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

/**
 * gets all the posts from the database and updates the redux state
 */
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