import { SET_PATIENT , START_ADD_PATIENT , PATIENT_ADDED, REMOVE_PATIENT } from "../actions/actionTypes";

const initialState = {
    patients: [],
    patientAdded: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PATIENT:
            return {
                ...state,
                patients: action.patients
            };

        case REMOVE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(patient => {
                    return patient.key !== action.key;
                })
            };

        case START_ADD_PATIENT:
            return{
                ...state,
                patientAdded : false,
            };

        case PATIENT_ADDED:
            return{
                ...state,
                patientAdded:  true
            };

        default:
            return state;
    }
};

export default reducer;

