import PostDataInterface from '../components/interfaces/PostDataInterface';
import ProblemDataInterface from '../components/interfaces/ProblemDataInterface';
import MessageDataInterface from '../components/interfaces/MessageDataInterface';
import UserDataInterface from '../components/interfaces/UserDataInterface';

export default interface State {
    Posts: PostDataInterface[],
    Problems: ProblemDataInterface[],
    Messages: MessageDataInterface[],
    Users: UserDataInterface[]
}