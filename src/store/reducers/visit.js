import { SET_VISITOR } from "../actions/actionTypes";
const initialState = {
    visits: []
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VISITOR:
            return {
                ...state,
                visits: action.visits
            };
        default:
            return state;
    }
};
export default reducer;

