import { SET_ROCHTA } from "../actions/actionTypes";

const initialState = {
    visits: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ROCHTA:
            return {
                ...state,
                visits: action.visits
            };
        default:
            return state;
    }
};

export default reducer;

