import {PATIENT_ADDED, REMOVE_PATIENT, SET_PATIENT, START_ADD_PATIENT} from "./actionTypes";
import {uiStartLoading, uiStopLoading, authGetToken , authLogout} from './index';
import axios from 'axios';
import {Alert, ToastAndroid} from 'react-native';
/******
 * Try Auto From Inputs
 */
const dummyData = {
    address: "ziko",
    bloodType: "o+",
    complaint: "asd",
    contactName: "asdasd",
    contactPhoneNo: "152",
    contactRelationship: "121",
    date: "2010-07-06T00:00:00.000Z",
    email: "",
    gender: "male",
    height: "116",
    homeNo: "1213",
    mobileNo: "192",
    patientName: "Bakry",
    surName: "lo77aa",
    weight: "313",
};


/**********
 * Start Add Patient In Our Redux Store
 */
export const startAddPatient = () => {
    return {
        type: START_ADD_PATIENT
    };
};

/**************
 * This CONST Request The Server To Start Add Patients
 */
 export const addPatient = (patientName, surName, height, weight,
                           gender, bloodType, complaint, date,
                           homeNo, mobileNo, address, email, contactName,
                           contactRelationship, contactPhoneNo, ) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const patientProfileData = {
            patientName, surName, height, weight,
            gender, bloodType, complaint, date: new Date(date).toISOString(),
            homeNo, mobileNo, address, email, contactName,
            contactRelationship, contactPhoneNo,
        };


        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
            })
            .then(token => {
                axios.post('http://codersea.com:8080/patient/addNewPatient', patientProfileData, {
                    headers: {
                        'content-type': 'application/json', "Authorization": token
                    }
                })

                    .then(res => {
                        const response = JSON.parse(res.request._response);
                        console.log("Add Patient",response);
                        dispatch(uiStopLoading());
                        ToastAndroid.show('You Have Add Patient!', ToastAndroid.LONG);
                        dispatch(patientAdded());
                    })
                    .catch((err) => {
                        console.log(err.response.data);
                        alert(err.response.data.error);
                        dispatch(uiStopLoading());
                    })
            });



    }
};


/*****
 * This CONST After We Success Add Patient That Hanlde Some Func In The Back Like Go To The Search Page Again
 */

export const patientAdded = () => {
    return {
        type: PATIENT_ADDED
    };
};

/************
 * Get Patients Data From The Server
 */
export const getPatient = () => {
    return dispatch => {

        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
                dispatch(uiStopLoading());
            })
            .then(token => {

        axios.get('http://codersea.com:8080/patient/', {
            headers: {
                'content-type': 'application/json', "Authorization": token
            }
        })

            .then(res => {
                dispatch(uiStartLoading());
                const response = JSON.parse(res.request._response);
                console.log(response);
                dispatch(uiStopLoading());
                if(response.message) {
                    Alert.alert(
                        'No Patients',
                        'No Patients Data To Search Please Go To Add Patients Screen And Add One , Thanks',
                        [
                            {text: 'OK',},
                        ],
                        { cancelable: false }
                    )
                }else{
                    dispatch(setPatient(response.patients));

                }
            })
            .catch((err) => {
                dispatch(uiStopLoading());
                alert("Check Your Internet Connection")

            })
            });
    };

};

/********
 * Set Patients in Our Redux Store
 */
export const setPatient = patients => {
    return {
        type: SET_PATIENT,
        patients: patients
    };
};

/************
 * Update The Patients Data
 */
export const updatePatient = (patientName, surName, email, mobileNo,
                              height,weight, bloodType,
                                complaint, homeNo,
                              address,gender,date, contactName ,contactRelationship, contactPhoneNo, selectedPatient )=> {

    return (dispatch) => {
        dispatch(uiStartLoading());
        const update = {
            patientName, surName, email, mobileNo,
            height,weight, bloodType,
            complaint, homeNo,
            address,gender,date, contactName ,contactRelationship, contactPhoneNo
        };
        dispatch(authGetToken())
            .catch(() => {
                alert("No valid token found!");
                dispatch(uiStopLoading());
            })
            .then(token => {
                    axios.patch(`http://codersea.com:8080/patient/${selectedPatient._id}`, update, {
                    headers: {
                        'content-type': 'application/json', "Authorization": token
                    }
                })
                    .then(res => {
                        const response = JSON.parse(res.request._response);
                        console.log("Update Patient",response);
                        dispatch(uiStopLoading());
                        ToastAndroid.show('Update Done!', ToastAndroid.LONG);
                    })
                    .catch((err) => {
                        console.log("cANT update",err.response.data);
                        alert(err.response.data.error);
                        dispatch(uiStopLoading());
                    })
            });
    };
};

/******
 * @params selectedPatient , key To Catch The Patient we Need To Delete it
 */
export const deletePatient = ( selectedPatient , key) => {
    return (dispatch, getState) => {
        dispatch(uiStartLoading());
        dispatch(removePatient(key));
        axios.delete(`http://codersea.com:8080/patient/${selectedPatient}`, {
            headers: {
                'content-type': 'application/json', "Authorization": getState().auth.token
            }
        })
            .then(res => {
                const response = JSON.parse(res.request._response);
             console.log(response);
                dispatch(uiStopLoading());
                ToastAndroid.show('You Have Delete Patient!', ToastAndroid.LONG);
            })
            .catch((err) => {

            })
    }
};

/******
 * param key to Remove The Patient we have deleted from Redux Store
 */
export const removePatient = key => {
    return {
        type: REMOVE_PATIENT,
        key: key
    };
};