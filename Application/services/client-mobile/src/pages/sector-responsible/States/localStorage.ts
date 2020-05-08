
import PostsData from './PostsData'
import PostsSectors from './PostsSectors'

interface State {
    Posts:{
        posts_data: PostsData[],
        posts_sectors: PostsSectors[],
    }
}
 

// Initial State
export const initialState: State = {
    Posts:{
        posts_data: [],
        posts_sectors: []
    }
};