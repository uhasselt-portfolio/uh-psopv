import ProblemInterface from '../interfaces/ProblemDataInterface';
import axios from "axios";
import Redux from 'redux';

export enum ReduxActionTypes {
    PROBLEM_SOLVED = 'PROBLEM_SOLVED',
    MESSAGE_READ = 'MESSAGE_READ',
    MESSAGE_SEND = 'MESSAGE_SEND',
    SHIFT_CHANGED = 'SHIFT_CHANGED',
    GENERATE_PDF = 'GENERATE_PDF',
    CHANGE_CONTROL_DELAY = 'CHANGE_CONTROL_DELAY',
    CHANGE_USER_CONNECTION = 'CHANGE_USER_CONNECTION',
    AXIOSTEST = 'AXIOSTEST'
}

export interface IReduxBaseAction {
    type: ReduxActionTypes;
}

export interface ActionProblemSolvedType extends IReduxBaseAction {
    type: ReduxActionTypes.PROBLEM_SOLVED,
    payload: ProblemInterface
}
export function ActionProblemSovled(problem: ProblemInterface) : ActionProblemSolvedType {
    return {
        type: ReduxActionTypes.PROBLEM_SOLVED,
        payload: problem
    };
}

export interface ActionShiftChangedType extends IReduxBaseAction {
    type: ReduxActionTypes.SHIFT_CHANGED,
    payload: {
        shift_id: Number,
        user_id: Number,
        user: string
    }
}
export function ActionShiftChanged(changedShiftid: Number, newUser: string) : ActionShiftChangedType {
    //TODO get User id from somewhere
    return {
        type: ReduxActionTypes.SHIFT_CHANGED,
        payload: {
            shift_id: changedShiftid,
            user_id: 0,
            user: newUser
        }
    }
}


    // EVERYBODY: 'EVERYBODY',
    // VOLUNTEER: 'VOLUNTEER',
    // SECTORMANAGER: 'SECTORMANAGER'
export interface ActionMessageSendType extends IReduxBaseAction {
    type: ReduxActionTypes.MESSAGE_SEND,
    payload: {
        receiver: string,
        user: string,
        title: string,
        content: string
    }
}
export function ActionMessageSend(receiver: string, user: string, title: string, content: string) : ActionMessageSendType{
    //TODO send action to server
    return {
        type: ReduxActionTypes.MESSAGE_SEND,
        payload: {
            receiver,
            user,
            title,
            content
        }
    }
}

export interface ActionMessageReadType extends IReduxBaseAction {
    type: ReduxActionTypes.MESSAGE_READ,
    payload: {
        messageId: Number
    }
}
export function ActionMessageRead(messageId: Number) : ActionMessageReadType {
    return {
        type: ReduxActionTypes.MESSAGE_READ,
        payload: {
            messageId
        }
    }
}

export interface ActionGeneratePdfType extends IReduxBaseAction {
    type: ReduxActionTypes.GENERATE_PDF
}
export function ActionGeneratePdf() : ActionGeneratePdfType {
    //TODO let the server generate a new pdf
    return {
        type: ReduxActionTypes.GENERATE_PDF
    }
}

export interface ActionChangeDelayType extends IReduxBaseAction {
    type: ReduxActionTypes.CHANGE_CONTROL_DELAY,
    payload: {
        newDelay: Number
    }
}
export function ActionChangeDelay(delay: Number) : ActionChangeDelayType {
    //TODO server
    return {
        type: ReduxActionTypes.CHANGE_CONTROL_DELAY,
        payload: {
            newDelay: delay
        }
    }
}

export interface ActionChangeUserConnectionType extends IReduxBaseAction {
    type: ReduxActionTypes.CHANGE_USER_CONNECTION,
    payload: {
        userId: Number,
        connection: boolean
    }
}
export function ActionChangeUserConnection(userId: Number, connection: boolean) : ActionChangeUserConnectionType {
    //TODO change in server
    return {
        type: ReduxActionTypes.CHANGE_USER_CONNECTION,
        payload: {
            userId,
            connection
        }
    }
}

export interface ActionAxiosTestType extends IReduxBaseAction {
    type: ReduxActionTypes.AXIOSTEST,
}
export const ActionAxiosTest = () => async (dispatch: Redux.Dispatch) => {
    console.log("test");
    try {
        
        const respone = await axios.get('http://localhost/api/user/fetch/all');
        console.log(respone);
    } catch (error) {
        console.log(error);
    }

}