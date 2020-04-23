import PostDataInterface from '../interfaces/PostDataInterface';
import ProblemDataInterface from '../interfaces/ProblemDataInterface';
import MessageDataInterface from '../interfaces/MessageDataInterface';
import UserDataInterface from '../interfaces/UserDataInterface';
import ShiftDataInterface from '../interfaces/ShiftDataInterface';
import ItemDataInterface from '../interfaces/ItemDataInterface';

export default interface State {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    messages: MessageDataInterface[],
    users: UserDataInterface[],
    planning: ShiftDataInterface[],
    items: ItemDataInterface[],
    pdfGenerated: boolean,
    positionDelay: Number,

    loading: boolean,
    errorMessage: string,
    isProblemFetched: boolean,
    isMapFetched: boolean,
    isOverviewFetched: boolean,
    isPlanningFetched: boolean,
    isPostFetched: boolean,
    isSettingsFetched: boolean,
    isUsersFetched: boolean,
    isProblemSolvedPosted: boolean,
    isUserConnectionChanged: boolean,
    loggedIn: UserDataInterface,
    isPostNewMessage: boolean
}

export const initialState : State = {
    loggedIn: {
        id:1, name:"naam", lastname:"lastname", gsmNumber:"gsmnummer", email:"email", has_internet: true, permission: 0, association:"vereneging", latitude: 50.965100, longitude: 5.364983
    },
    posts: [],
    problems: [],
    users: [],
    messages: [],
    planning: [],
    items: [],
    pdfGenerated: false,
    positionDelay: 15,
    isProblemFetched : false,
    loading: false,
    isMapFetched: false,
    errorMessage: '',
    isOverviewFetched: false,
    isPlanningFetched: false,
    isPostFetched: false,
    isSettingsFetched: false,
    isUsersFetched: false,
    isProblemSolvedPosted: false,
    isUserConnectionChanged: false,
    isPostNewMessage: false
}