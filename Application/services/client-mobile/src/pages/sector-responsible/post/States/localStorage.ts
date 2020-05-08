import ShiftData from './ShiftData'

interface State {
    shifts_data: ShiftData[],
}
 

// Initial State
export const initialState: State = {
    shifts_data: []
};