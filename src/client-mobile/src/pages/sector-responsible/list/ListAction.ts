import Redux from 'redux';
import {getDefaultSector, getListLocalStorage} from "../../save/saveFunction";


export const PLANNING_FETCH_START = 'PLANNING_FETCH_START'
export const PLANNING_FETCH_SUCCESS = 'PLANNING_FETCH_SUCCESS'
export const PLANNING_FETCH_FAIL = 'PLANNING_FETCH_FAIL'

export const fetchPosts = () => async (dispatch: Redux.Dispatch) => {
    try {
        const postsData = await getListLocalStorage('posts');
        const default_sector = await getDefaultSector();
        const posts_sectors = await getListLocalStorage('sectors');
        const sectorColors = await getListLocalStorage('sector_colors');

        let data = {
            posts_data: postsData,
            default_sector: default_sector,
            posts_sectors: posts_sectors,
            sector_colors: sectorColors
        }

        dispatch({type: PLANNING_FETCH_SUCCESS, payload: data})
    } catch (error) {
        console.log(error)
        dispatch({
            type: PLANNING_FETCH_FAIL,
            payload: {posts_data: [], default_sector: -1, posts_sectors: [], sector_colors: []}
        })
    }
}