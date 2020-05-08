
import PostsData from './PostsData'
import PostsSectors from './PostsSectors'

interface State {
    posts_data: PostsData[],
    posts_sectors: PostsSectors[],
}
 

// Initial State
export const initialState: State = {
    posts_data: [],
    posts_sectors: []
};