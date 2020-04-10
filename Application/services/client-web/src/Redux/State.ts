import PostDataInterface from '../Components/Interfaces/PostDataInterface';
import ProblemDataInterface from '../Components/Interfaces/ProblemDataInterface';
import MessageDataInterface from '../Components/Interfaces/MessageDataInterface';
import UserDataInterface from '../Components/Interfaces/UserDataInterface';
import ShiftDataInterface from '../Components/Interfaces/ShiftDataInterface';

export default interface State {
    Posts: PostDataInterface[],
    Problems: ProblemDataInterface[],
    Messages: MessageDataInterface[],
    Users: UserDataInterface[],
    Planning: ShiftDataInterface[],
    pdfGenerated: boolean
}