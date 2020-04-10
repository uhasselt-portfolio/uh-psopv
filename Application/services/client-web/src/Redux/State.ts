import PostDataInterface from '../Components/Interfaces/PostDataInterface';
import ProblemDataInterface from '../Components/Interfaces/ProblemDataInterface';
import MessageDataInterface from '../Components/Interfaces/MessageDataInterface';
import UserDataInterface from '../Components/Interfaces/UserDataInterface';
import ShiftDataInterface from '../Components/Interfaces/ShiftDataInterface';
import ItemDataInterface from '../Components/Interfaces/ItemDataInterface';

export default interface State {
    posts: PostDataInterface[],
    problems: ProblemDataInterface[],
    messages: MessageDataInterface[],
    users: UserDataInterface[],
    planning: ShiftDataInterface[],
    items: ItemDataInterface[],
    pdfGenerated: boolean
}