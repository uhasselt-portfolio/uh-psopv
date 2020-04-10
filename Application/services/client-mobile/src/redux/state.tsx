import PostDataInterface from '../components/interfaces/PostDataInterface'
import NotificationDataInterface from '../components/interfaces/NotificationDataInterface'

export default interface State {
    Posts: PostDataInterface[],
    notifications: NotificationDataInterface[],
}