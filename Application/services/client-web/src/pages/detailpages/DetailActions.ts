import axios from 'axios';
import Redux from 'redux';
import ItemDataInterface from '../../interfaces/ItemDataInterface';
import ShiftDatainterface from '../../interfaces/ShiftDataInterface';


export enum DetailActions {
    DETAIL_PLANNING_FETCH_START = 'DETAIL_PLANNING_FETCH_STRART',
    DETAIL_PLANNING_FETCH_SUCCES = 'DETAIL_PLANNING_FETCH_SUCCES',
    DETAIL_PLANNING_FETCH_FAIL = 'DETAIL_PLANNING_FETCH_FAIL'
};

export const fetchPlanning = () => async (dispatch : Redux.Dispatch) => {
    console.log("in Detail fetch");
    try {
        dispatch({
            type: DetailActions.DETAIL_PLANNING_FETCH_START
        });

        const responePlanning = await axios.get('http://localhost/api/planning/fetch/all');

        let shifts: ShiftDatainterface[] = [];
        for (let i = 0; i < responePlanning.data.data.plannings.length; ++i) {
            shifts.push({
                id: responePlanning.data.data.plannings[i].id,
                shiftName: responePlanning.data.data.plannings[i].shift.name,
                shiftId: responePlanning.data.data.plannings[i].shift_id,
                beginDate: responePlanning.data.data.plannings[i].shift.begin,
                endDate: responePlanning.data.data.plannings[i].shift.end,
                post_id: responePlanning.data.data.plannings[i].post.id,
                post: responePlanning.data.data.plannings[i].post.title,
                User_id: responePlanning.data.data.plannings[i].user.id,
                user: responePlanning.data.data.plannings[i].user.first_name + " " + responePlanning.data.data.plannings[i].user.last_name,
                sector: responePlanning.data.data.plannings[i].post.sectro_id
            })
        }

        const responseItems = await axios.get('http://localhost/api/item/fetch/all');

        let items: ItemDataInterface[] = [];
        for (let i = 0; i < responseItems.data.data.items.length; ++i) {
            items.push({
                id: responseItems.data.data.items[i].id,
                shiftId: responseItems.data.data.items[i].planning_id,
                itemType: responseItems.data.data.items[i].item_type.name
            })
        }

        dispatch({
            type: DetailActions.DETAIL_PLANNING_FETCH_SUCCES,
            payload: {
                shifts: shifts,
                items: items
            }
        });
    } catch(error) {
        if (error.response) {
            // Server responded with a code high than 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);

            dispatch({type: DetailActions.DETAIL_PLANNING_FETCH_FAIL, payload: error.response.data.message});
        } else if (error.request) {
            // No response was received from the server
            console.log(error.request);
        } else {
            // Request couldn't get send
            console.log('Error', error.message);
        }   
    }
}