import {AsyncStorage} from 'react-native';
import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index";
import App from "../../../App";
import Toast from 'react-native-simple-toast';

import startMainTabs from '../../screens/MainTabs/startMainTabs';
import axios from 'axios';
/********
 * @param authData to talk to The email And Pass UI
 */
export const authSingIn = (authData) => {

    return dispatch => {
        dispatch(uiStartLoading());
        axios.post(`http://165.227.220.14:8080/user/signin`, {
                email: authData.email,
                password: authData.password,
        })
            .then(res => {
                const response = JSON.parse(res.request._response);
                if(!response.token){
                    alert(response.message);
                    dispatch(uiStopLoading());
                }else{
                dispatch(authStoreToken(response.token, response.expiresIn , response.refreshToken));
                      startMainTabs();
                    dispatch(uiStopLoading());
                    Toast.show('You Have Logged In!', Toast.LONG);
                }
            })
            .catch((err) => {
                alert(err.response.data.message);
                dispatch(uiStopLoading());
            })

            .catch((err)=> {
                    alert("Check Your Internet Connection")
                dispatch(uiStopLoading());
        })




     }
};
/*******
 *@param  token to store in AsyncStorage
 * @param expiresIn to store token in AsyncStorage Time
 * @param refreshToken to store it in AsyncStorage
 */
export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn +1000;
        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    }
};
/*********
 * store token and expiryDate in Our Redux CONTAINER State
 */
export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
    };
};
/*********
 * This CONST to Get The Token And Expire Date from The Server And used it Over THE App
 */
export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if (!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken;
                AsyncStorage.getItem("ap:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("ap:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            dispatch(authSetToken(fetchedToken));
                            resolve(fetchedToken);
                        } else {
                            reject();
                        }
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        });
        return promise
            .catch(err => {
                return AsyncStorage.getItem("ap:auth:refreshToken")
                    .then(refreshToken => {
                        return axios.post(
                            "http://165.227.220.14:8080/user/refreshtoken",
                        {
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                            body: {refreshToken:refreshToken}

                            }
                        );
                    })
                    .then(res => {
                        const response = JSON.parse(res.request._response);
                      //  console.log(response);
                    })


            })


    };
};
/*******
 * This CONST To Set Token After Login , When Reloading And dispatch the App it Not Return To Login Page Again
 * Before expiration Time Finish or Signout
 */
export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
                dispatch(uiStartLoading());
            })

    };
};
/*******
 * This Const To clean up the async storage if we failed ,
 * if we have no token or valid token beacause expired
 */
export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
        return AsyncStorage.removeItem("ap:auth:refreshToken");

    };
};
/*****
 * LOGOUT Action
 */
export const authLogout = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {

                App();
            });
        dispatch(authRemoveToken());
        Toast.show('You Are Logged Out', Toast.LONG);
    };
};
/****
 * Remove Token From Our Redux
 */
export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };

};
