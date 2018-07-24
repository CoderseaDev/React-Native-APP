import {AsyncStorage} from 'react-native';
import {AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index";
import App from "../../../App";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import axios from 'axios';
import {ToastAndroid} from 'react-native';
import OfflineNotice from "../../components/OfflineNotice/OffilneNotice";
import MiniOfflineSign from "../../components/OfflineNotice/OffilneNotice";
/********
 * @param authData to talk to The email And Pass UI
 */
export const authSingIn = (authData) => {

    return dispatch => {
        dispatch(uiStartLoading());

        if(OfflineNotice){
            dispatch(uiStopLoading());
        }
        axios.post(`http://codersea.com:8080/user/signin`, {

                email: "b@b.com",
                password: "123456",

        })
            .then(res => {
                const response = JSON.parse(res.request._response);
                console.log(response);

                if(!response.token){
                    console.log("Auth Failed");
                    alert("Auth Failed")
                }else{
                dispatch(authStoreToken(response.token, response.expiresIn , response.refreshToken));
                    dispatch(uiStopLoading());
                      startMainTabs();
                    dispatch(uiStartLoading());
                    ToastAndroid.show('You Have Logged In!', ToastAndroid.LONG);
                }
            })
            .catch((err) => {
                alert(err.response.data.message)
                dispatch(uiStopLoading());
            });


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
                            "http://codersea.com:8080/user/refreshtoken",
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
                        console.log(response);
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
            .catch(err => console.log("Failed to fetch token!"));
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
        ToastAndroid.show('You Are Logged Out', ToastAndroid.LONG);
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
