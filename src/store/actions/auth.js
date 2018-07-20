import {AsyncStorage} from 'react-native';
import {TRY_AUTH, AUTH_SET_TOKEN, AUTH_REMOVE_TOKEN} from './actionTypes';
import {uiStartLoading, uiStopLoading} from "./index";
import App from "../../../App";
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import axios from 'axios';
import {ToastAndroid} from 'react-native';

export const tryAuth = (authData) => {

    return dispatch => {
        dispatch(uiStartLoading());
        axios.post(`http://codersea.com:8080/user/signin`, {

                email: "a@a.com",
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
                    ToastAndroid.show('You Have Logged In!', ToastAndroid.LONG);
                }
            })
            .catch((err) => {
                alert(err.response.data.message)
                dispatch(uiStopLoading());
            });


    }
};


// store in asynchstorage
export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn +1000;

        console.log(now , new Date(expiryDate));

        dispatch(authSetToken(token, expiryDate));
        AsyncStorage.setItem("ap:auth:token", token);
        AsyncStorage.setItem("ap:auth:expiryDate", expiryDate.toString());
        AsyncStorage.setItem("ap:auth:refreshToken", refreshToken);
    }
};


//set token in our redux store
export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate,
    };
};




/*
export const authGetToken =()=>{

    return (dispatch , getState) =>{
        const promise = new Promise((resolve , reject)=>{
            const token = getState().auth.token;
            if(!token){
                reject();
            }else {
                resolve(token);
            }
        });
        return promise;
    };
};
*/



export const authGetToken = () => {
    return (dispatch, getState) => {

        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;



            //expired date smaller than current date , means okay token is expired bec expiration date 5els
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


// to atuo singin function with token
// after he sign in and set his token , he not will reurn to login page agin before the expiration time reload

export const authAutoSignIn = () => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err => console.log("Failed to fetch token!"));
    };
};


//clean up the async storage if we failed , if we have no token or valid token beacause expired
export const authClearStorage = () => {

    return dispatch => {
        AsyncStorage.removeItem("ap:auth:token");
        AsyncStorage.removeItem("ap:auth:expiryDate");
        return AsyncStorage.removeItem("ap:auth:refreshToken");

    };
};

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


export const authRemoveToken = () => {
    return {
        type: AUTH_REMOVE_TOKEN
    };

};

/*export const goToAuthPage = () => {
    return dispatch => {
        dispatch(authClearStorage())
            .then(() => {
                App();
            });

    };
};*/







/*
export const authLogout = () => {
    return (dispatch, getState) => {

        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;


            //expired date smaller than current date , means okay token is expired bec expiration date 5els
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
                        console.log(refreshToken);
                    })

                    .then(res => {
                        const response = JSON.parse(res.request._response);
                        console.log(response);
                    })

                /!*  .then(parsedRes => {

                      console.log("try",parsedRes);
                      console.log("el TOKEN",parsedRes.token);
                      console.log(parsedRes.userId)
                      if (parsedRes.token) {
                          console.log("Refresh token worked!");
                          dispatch(
                              authStoreToken(
                                  parsedRes.token,
                                  parsedRes.expiresIn,
                                  parsedRes.refreshToken
                              )
                          );
                          return parsedRes.token;
                      } else {
                          dispatch(authClearStorage());
                      }
                  });*!/
            })

        /!* .catch(err => {
//refresh token to get  a new iDToken , note : show it on the consloe
             return AsyncStorage.getItem("ap:auth:refreshToken")
                 .then(refreshToken => {
                     axios.post("http://codersea.com:8080/user/refreshtoken" , {
                         headers: {
                             "Content-Type": "application/json"
                         },
                         body:refreshToken
                     })
                         .then(res => {
                             const response = JSON.parse(res.request._response);
                             console.log(response);
                             if (response.token) {
                                 console.log("Refresh Token Worked!");
                                 dispatch(authStoreToken(response.token, response.expiresIn, response.refreshToken));
                                 return response.token;
                             } else {
                                 dispatch(authClearStorage());
                             }
                         })
                 })
         });*!/
    };
};*/
