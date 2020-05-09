import ShiftData from './ShiftData'

interface State {
    shifts_data: ShiftData[],
    save_actions: any[]
}
 

// Initial State
export const initialState: State = {
    shifts_data: [],
    save_actions: []
};