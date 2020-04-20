export default(state = [], action: any) => {
    switch (action.type) {
        case 'FETCH_MESSAGE':
            return  action.payload;
        default:
            return state
    }
};