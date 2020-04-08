import PostInterface from '../Components/Interfaces/PostDataInterface';
import UserInterface from '../Components/Interfaces/UserDataInterface';
import ProblemInterface from '../Components/Interfaces/ProblemDataInterface';
import MessageInterface from '../Components/Interfaces/MessageDataInterface';

export enum ReduxActionTypes {
    GET_POSTS = 'ADD_POSTS',
    GET_USERS = 'ADD_USERS',
    GET_PROBLEMS = "ADD_PROBLEMS",
    PROBLEM_SOLVED = 'PROBLEM_SOLVED',
    GET_MESSAGES = 'ADD_MESSAGES',
    MESSAGE_READ = 'MESSAGE_READ',
}

export interface IReduxBaseAction {
    type: ReduxActionTypes;
}

export interface ActionAddPostType extends IReduxBaseAction {
    type: ReduxActionTypes.GET_POSTS,
    payload: PostInterface[]
}
export function ActionGetPost() : ActionAddPostType {
    return {
        type: ReduxActionTypes.GET_POSTS,
        payload: [
            {title: "test", addres: "address", sector: 0, general: "general", latitude: 0, longitude: 0}
        ]
    }
}

export interface ActionAddProblemType extends IReduxBaseAction {
    type: ReduxActionTypes.GET_PROBLEMS,
    payload: ProblemInterface[]
}

export interface ActionAddUserType extends IReduxBaseAction {
    type: ReduxActionTypes.GET_USERS,
    payload: UserInterface[]
}

export interface ActionProblemSolvedType extends IReduxBaseAction {
    type: ReduxActionTypes.PROBLEM_SOLVED,
    payload: ProblemInterface
}

export interface ActionAddMessageType extends IReduxBaseAction {
    type: ReduxActionTypes.GET_MESSAGES,
    payload: MessageInterface[]
}

export interface ActionMessageReadType extends IReduxBaseAction {
    type: ReduxActionTypes.MESSAGE_READ,
    payload: MessageInterface
}