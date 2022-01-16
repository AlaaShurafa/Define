import {
    IS_LOGGED_REQUEST,
    IS_LOGGED_FAILURE,
    IS_LOGGED_SUCCESS,

    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,

    LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,

    SIGNUP_USER_REQUEST,
    SIGNUP_USER_SUCCESS,
    SIGNUP_USER_FAILURE,

    FETCH_USER_DATA_REQUEST,
    FETCH_USER_DATA_FAILURE,
    FETCH_USER_DATA_SUCCESS,

    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA_SUCCESS,
    UPDATE_USER_DATA_FAILURE,

    CHANGE_PASSWORD_REQUEST,
    CHANGE_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_FAILURE,

    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,

    SEND_VER_CODE_EMAIL_REQUEST,
    SEND_VER_CODE_EMAIL_SUCCESS,
    SEND_VER_CODE_EMAIL_FAILURE,

    CHECK_CODE_EMAIL_REQUEST,
    CHECK_CODE_EMAIL_SUCCESS,
    CHECK_CODE_EMAIL_FAILURE,

    SHOW_MODAL,
    CLOSE_MODAL,
    GET_INSTALL_SUCCESS,
    LOGIN_GUEST,
} from '../types'

import * as API from '../../../services/api.js';
import deviceStorage from '../../../services/deviceStorage';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { navigate } from '../../../navigations/RootNavigation'
// import firebase from '@react-native-firebase/app';

export const is_logged_user = () => async (dispatch) => {
    dispatch({
        type: IS_LOGGED_REQUEST
    })
    try {
        console.log('start logged user')
        const token = await deviceStorage.getItem('access_token')
        const response = await API.getInstall()
        console.log(response , 'response?.data?.data')
        const { Countries } = response?.data?.data
        CountriesData = []
        Countries.forEach((item)=>CountriesData.push({
            label:item.name,
            value:item.name,
            key:item.id,
        }))
        if(response?.data?.data){
            dispatch({
                type:GET_INSTALL_SUCCESS,
                payload:{
                    data: {...response?.data?.data, Countries:CountriesData}
                }
            })
        }
        if (token) {
            console.log('token token', token)
            const response = await API.getUserData();
            if (response?.data?.status?.status === "fail") {
                dispatch({
                    type: IS_LOGGED_FAILURE
                })
            }
            else {
                dispatch({
                    type: IS_LOGGED_SUCCESS,
                    payload: {
                        user: response.data.User,
                    }
                })
            }
        }
        else {
            console.log('tttttttttt')
            dispatch({
                type: LOGIN_GUEST,
                payload:{
                    start:true
                }
            })
            // dispatch({
            //     type: IS_LOGGED_FAILURE
            // })
        }

    }
    catch (error) {
        console.log(error , 'error')
        dispatch({
                type: IS_LOGGED_FAILURE
            })
        throw error
    }
}
export const loginUser = (username, password, user_type) => async (dispatch) => {
    dispatch({
        type: LOGIN_USER_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        // const defaultAppMessaging = firebase.messaging();
        // let device_token = await defaultAppMessaging.getToken()
        const response = await API.logIn(username, password,user_type,'device_token');
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            const access_token = response.data.User.access_token;
            await deviceStorage.saveItem('access_token', access_token)
            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: {
                    user: response.data.User,
                }
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: LOGIN_USER_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const loginGuest = (start) => async (dispatch) => {
    console.log(start , 'start')
    dispatch({
        type: LOGIN_GUEST,
        payload:{
            start
        }
    })

}
export const signUpUser = (email, password, name, mobile,country_id, cvr_nr) => async (dispatch) => {
    dispatch({
        type: SIGNUP_USER_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        // const defaultAppMessaging = firebase.messaging();
        // let device_token = await defaultAppMessaging.getToken()
        const response = await API.signUp(email, password, name, mobile,country_id,cvr_nr,'device_token');
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            const access_token = response.data.User.access_token;
            await deviceStorage.saveItem('access_token', access_token)
            dispatch({
                type: SIGNUP_USER_SUCCESS,
                payload: {
                    user: response.data.User,
                }
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: SIGNUP_USER_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const updateUser = (email, name, mobile, image) => async (dispatch) => {
    dispatch({
        type: UPDATE_USER_DATA_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.updateUserApi(email, name, mobile, image);
        // console.log(response , 'rrrrr')
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            console.log(response?.data , 'response?.data?')
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            const access_token = response.data.User.access_token;
            // console.log(access_token , 'access_token')
            await deviceStorage.saveItem('access_token', access_token)
            dispatch({
                type: UPDATE_USER_DATA_SUCCESS,
                payload: {
                    user: response.data.User,
                }
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('err', 2000))
        dispatch({
            type: UPDATE_USER_DATA_FAILURE,
        })
    }
}
export const ChangeUserPassword = (cPassword, password, rePassword) => async (dispatch) => {
    dispatch({
        type: CHANGE_PASSWORD_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.ChangeUserPassword(cPassword, password, rePassword);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message, 2000))
            const access_token = response.data.User.access_token;
            await deviceStorage.saveItem('access_token', access_token)
            dispatch({
                type: CHANGE_PASSWORD_SUCCESS,
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: CHANGE_PASSWORD_FAILURE,
        })
    }
}
export const ResetUserPassword = (password, rePassword, email, code) => async (dispatch) => {
    dispatch({
        type: RESET_PASSWORD_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.ResetUserPassword(password, rePassword, email, code);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message, 2000))
            dispatch({
                type: RESET_PASSWORD_SUCCESS,
            })
            navigate('Login')
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: RESET_PASSWORD_FAILURE,
        })
    }
}
export const logout = () => async (dispatch) => {
    dispatch({
        type: LOGOUT_USER_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.logout();
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            deviceStorage.removeItem('access_token')
            dispatch({
                type: LOGOUT_USER_SUCCESS
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: LOGOUT_USER_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const sendEmailCode = (email) => async (dispatch) => {
    dispatch({
        type: SEND_VER_CODE_EMAIL_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.sendEmailCodeApi(email);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message[0], 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: SEND_VER_CODE_EMAIL_SUCCESS,
            })
            navigate('PasswordCode',{
                email
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: SEND_VER_CODE_EMAIL_FAILURE,
        })
    }
}
export const checkEmailCode = (email,code) => async (dispatch) => {
    dispatch({
        type: CHECK_CODE_EMAIL_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.checkEmailCodeApi(email,code);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message[0], 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: CHECK_CODE_EMAIL_SUCCESS,
            })
            navigate('ResetPassword',{
                email,
                code
            })
        }

        dispatch({ type: CLOSE_MODAL })

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: CHECK_CODE_EMAIL_FAILURE,
        })
    }
}
export const fetchUserData = () => async (dispatch) => {
    dispatch({
        type: FETCH_USER_DATA_REQUEST
    })
    try {
        const user = await API.userInfo();

        dispatch({
            type: FETCH_USER_DATA_SUCCESS,
            payload: {
                user: user.data.data[0]
            }
        })

    } catch (err) {
        dispatch({
            type: FETCH_USER_DATA_FAILURE,
            payload: {
                error: err.message
            }
        })
    }
}

