import {createStore,combineReducers , compose , applyMiddleware} from 'redux';

import  thunk from 'redux-thunk';
import searchReducer from "./reducers/search";

import  uiReducer from "./reducers/ui";

import authReducer from "./reducers/auth";

import visitReducer from  "./reducers/visit";

import patientReducer from "./reducers/patientProfile";

const rootReducer = combineReducers({

    ui:uiReducer,
    auth: authReducer,
    visit: visitReducer,
    patientProfile: patientReducer,




    search: searchReducer,
});

let composeEnhancers = compose;
if (__DEV__){
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}
const configureStore = ()=>{
    return createStore(rootReducer ,composeEnhancers(applyMiddleware(thunk )));
};

export  default configureStore;
