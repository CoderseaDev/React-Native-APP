import {uiStartLoading, uiStopLoading, authGetToken} from './index';
import {SET_ROCHTA} from "./actionTypes";
import {ToastAndroid} from 'react-native';
import axios from 'axios';


export const addRochta = (visitorName, comment, image, date, pkey) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        const data = new FormData();
        data.append('visitorName', visitorName);
        data.append('comment', comment);
        data.append('date', new Date(date).toISOString());
        data.append('patient_id', pkey._id);
        data.append('image', {
            uri : image.uri,
            type: image.type,
            name: image.fileName
        });
        axios.post("http://codersea.com:8080/visit/addVisit", data, {headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            "Authorization": getState().auth.token
        }})
            .then((responseJson) => {
                console.group("visit success");
                console.log(responseJson);
                console.groupEnd("visit success");
                dispatch(uiStopLoading());
                ToastAndroid.show('You Have Add The Visitor!', ToastAndroid.LONG);
            })
            .catch((error) => {
                dispatch(uiStopLoading());
                alert("Please Fill The Blank Inputs")
                console.log(error);
            });
    }
};
export const getRochta = (pkey1) => {
    return (dispatch, getState) => {
        console.log(pkey1);
        axios.get(`http://codersea.com:8080/patient/${pkey1}`, {
            headers: {
                'content-type': 'application/json', "Authorization": getState().auth.token
            }
        })
            .then(res => {
                const response = JSON.parse(res.request._response).visits_info;
               console.log("Get Visit",response);

                dispatch(setRochta(response));
                console.log(response)
            })
            .catch((err) => {
                console.log(err.response.data);
            })
    };

};

export const setRochta = visits => {
    return {
        type: SET_ROCHTA,
        visits: visits
    };
};

