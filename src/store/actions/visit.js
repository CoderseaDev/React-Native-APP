import {uiStartLoading, uiStopLoading} from './index';
import {SET_VISITOR} from "./actionTypes";
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {Alert} from 'react-native'
/*************
 * This CONST Add Visitors To The Patient ,
 * @params pkey => to Catch The its Already The Patient We Need To Add The Visitors To it Or Not
 */
export const addVisitor = ( comment, image, date, pkey) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        const data = new FormData();
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        data.append('comment', comment);
        data.append('date', new Date(date).toISOString());
        data.append('patient_id', pkey._id);
        data.append('image', {
            uri: image.uri,
            type: image.type,
            //name: image.fileName,
            // Specify the File Name , becuase IOS FileName is not find , android is find w must create that to create new file name
            name : possible.charAt(Math.floor(Math.random() * possible.length))
        });
        axios.post("http://165.227.220.14:8080/visit/addVisit", data, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                "Authorization": getState().auth.token
            }
        })
            .then((responseJson) => {
                dispatch(uiStopLoading());
                Toast.show('You Have Add The Visit', Toast.LONG);
            })
            .catch((error) => {
                if(error.response.data.error) {
                    dispatch(uiStopLoading());
                        alert(error.response.data.error);
                }
            })
            .catch((error) => {
            dispatch(uiStopLoading());
            alert("Please Upload Image");
        })
    }
};
/****
 * Get Visitor by @param pkey1
 */
export const getVisitor = (pkey1) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        axios.get(`http://165.227.220.14:8080/patient/${pkey1}`, {
            headers: {
                'content-type': 'application/json', "Authorization": getState().auth.token
            }
        })
            .then(res => {
                const response = JSON.parse(res.request._response).visits_info;
                dispatch(uiStopLoading());
                if(response.length===0) {
                    Alert.alert(
                        'Empty Visits History',
                        'No Visits History for This Patient Until Now',
                        [
                            {text: 'OK'},
                        ],
                        { cancelable: false }
                    )
                }else{
                    dispatch(setVisitor(response));
                }
            })
            .catch((err) => {
                dispatch(uiStopLoading());
            })
    };
};
/*****
 * To Set Visitor To Our Redux Store
 */
export const setVisitor = visits => {
    return {
        type: SET_VISITOR,
        visits: visits
    };
};

