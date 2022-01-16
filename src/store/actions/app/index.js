import { PermissionsAndroid } from 'react-native'
import {
    CONTACT_US_FAILURE,
    CONTACT_US_REQUEST,
    CONTACT_US_SUCCESS,

    GET_HOME_REQUEST,
    GET_HOME_FAILURE,
    GET_HOME_SUCCESS,

    GET_FAV_REQUEST,
    GET_FAV_SUCCESS,
    GET_FAV_FAILURE,

    GET_FOODS_REQUEST,
    GET_FOODS_SUCCESS,
    GET_FOODS_FAILURE,

    GET_MOST_ORDER_FOODS_REQUEST,
    GET_MOST_ORDER_FOODS_SUCCESS,
    GET_MOST_ORDER_FOODS_FAILURE,

    GET_ORDERS_REQUEST,
    GET_ORDERS_SUCCESS,
    GET_ORDERS_FAILURE,

    GET_NOTIFICATIONS_REQUEST,
    GET_NOTIFICATIONS_SUCCESS,
    GET_NOTIFICATIONS_FAILURE,

    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILURE,

    TOGGLE_FAV_REQUEST,
    TOGGLE_FAV_SUCCESS,
    TOGGLE_FAV_FAILURE,

    READ_NOTIFICATION_REQUEST,
    READ_NOTIFICATION_SUCCESS,
    READ_NOTIFICATION_FAILURE,

    STORE_ORDER_REQUEST,
    STORE_ORDER_SUCCESS,
    STORE_ORDER_FAILURE,

    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,

    GET_MORE_FOODS_REQUEST,
    GET_MORE_FOODS_SUCCESS,
    GET_MORE_FOODS_FAILURE,

    SHOW_MODAL,
    CLOSE_MODAL,
    GET_LOCATIONS_REQUEST,
    GET_LOCATIONS_SUCCESS,
    GET_LOCATIONS_FAILURE,


    ADD_LOCATION_REQUEST,
    ADD_LOCATION_SUCCESS,
    ADD_LOCATION_FAILURE,
    GET_TICKETS_REQUEST,
    GET_TICKETS_SUCCESS,
    GET_TICKETS_FAILURE,
    RESPONSE_TICKETS_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    RESPONSE_TICKETS_SUCCESS,
    RESPONSE_TICKETS_FAILURE,
    HAS_PAYMENT_REQUEST,
    HAS_PAYMENT_SUCCESS,
    HAS_PAYMENT_FAILURE
} from '../types'

import * as API from '../../../services/api.js';
import deviceStorage from '../../../services/deviceStorage';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { navigate } from '../../../navigations/RootNavigation'
export const contactUsForm = (title,message) => async (dispatch) => {
    dispatch({
        type: CONTACT_US_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.contactUs(title,message);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: CONTACT_US_SUCCESS,
            })
        }

        dispatch({ type: CLOSE_MODAL })
        navigate('Tickets')

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: CONTACT_US_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const responseTicket = (ticket_id,message) => async (dispatch) => {
    // console.log(ticket_id,response , 'ticket_id,response from action')
    dispatch({
        type: RESPONSE_TICKETS_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.responseTicket(ticket_id,message);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: RESPONSE_TICKETS_SUCCESS,
            })
        }
        dispatch({ type: CLOSE_MODAL })
        return response?.data?.Ticket
        // navigate('Tickets')

    } catch (err) {
        console.log(err, 'err')
        dispatch({ type: CLOSE_MODAL })
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: RESPONSE_TICKETS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getHome = (provider_type) => async (dispatch) => {
    dispatch({
        type: GET_HOME_REQUEST
    })
    try {
        const response = await API.getHome(provider_type);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch({
                type: GET_HOME_SUCCESS,
                payload:{
                    providers: response?.data.Providers
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_HOME_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getFav = () => async (dispatch) => {
    dispatch({
        type: GET_FAV_REQUEST
    })
    try {
        const response = await API.getFoods();
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }

        else {
            let favourites = [...response?.data.Products]
            console.log(favourites)
            favourites = favourites.filter((item)=>item?.is_fav)
            console.log(favourites , 'favouritesssss')

            dispatch({
                type: GET_FAV_SUCCESS,
                payload:{
                    favourites
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_FAV_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getLocations = () => async (dispatch) => {
    dispatch({
        type: GET_LOCATIONS_REQUEST
    })
    try {
        const response = await API.getLocations();
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }

        else {
            dispatch({
                type: GET_LOCATIONS_SUCCESS,
                payload:{
                    locations: response?.data?.Location
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_LOCATIONS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getTickets = () => async (dispatch) => {
    dispatch({
        type: GET_TICKETS_REQUEST
    })
    try {
        const response = await API.getTickets();
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }

        else {
            dispatch({
                type: GET_TICKETS_SUCCESS,
                payload:{
                    tickets: response?.data?.Tickets
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_TICKETS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getFoods = (category_id, most_ordered, per_page,q = undefined) => async (dispatch) => {
    console.log(category_id, most_ordered, per_page,q)
    dispatch({
        type: GET_FOODS_REQUEST
    })
    try {
        const response = await API.getFoods(category_id, most_ordered, per_page,q);
        console.log(response , 'reee')
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch({
                type: GET_FOODS_SUCCESS,
                payload:{
                    foods : response?.data.Products,
                    pagingProducts: response?.data.paging
                }
            })
            // if(q != undefined){
            //     dispatch({
            //         type: GET_FOODS_SUCCESS,
            //         payload:{
            //             searchProducts : response?.data.Products
            //         }
            //     })
            // }
            // else{
            //     dispatch({
            //         type: GET_FOODS_SUCCESS,
            //         payload:{
            //             foods : response?.data.Products,
            //             pagingProducts: response?.data.paging
            //         }
            //     })
            // }
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_FOODS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getMoreProducts = (category_id, most_ordered, per_page,q = undefined, page) => async (dispatch) => {
    dispatch({
        type: GET_MORE_FOODS_REQUEST
    })
    try {
        const response = await API.getFoods(category_id, most_ordered, per_page,q, page);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            if(q != undefined){
                dispatch({
                    type: GET_MORE_FOODS_SUCCESS,
                    payload:{
                        searchProducts : response?.data.Products,
                        // pagingProducts: response?.data.paging
                    }
                })
            }
            else{
                dispatch({
                    type: GET_MORE_FOODS_SUCCESS,
                    payload:{
                        foods : response?.data.Products,
                        pagingProducts: response?.data.paging
                    }
                })
            }
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_MORE_FOODS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getMostOrdered = (category_id, most_ordered, per_page) => async (dispatch) => {
    dispatch({
        type: GET_MOST_ORDER_FOODS_REQUEST
    })
    try {
        const response = await API.getFoods(category_id, most_ordered, per_page);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch({
                type: GET_MOST_ORDER_FOODS_SUCCESS,
                payload:{
                    foods: response?.data.Products
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_MOST_ORDER_FOODS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getOrders = (complete) => async (dispatch) => {
    dispatch({
        type: GET_ORDERS_REQUEST
    })
    try {
        const response = await API.getOrders(complete);
            if (response?.data?.status?.status === "fail") {
                dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
            }
            else {
                dispatch({
                    type: GET_ORDERS_SUCCESS,
                    payload:{
                        orders: response?.data.Orders
                    }
                })
            }
        // if(Platform.OS === 'ios'){
        //     Geolocation.getCurrentPosition(
        //         async(position) => {
        //             const response = await API.getOrders(complete,position.coords.latitude,position.coords.longitude);
        //                 if (response?.data?.status?.status === "fail") {
                            // dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        //                 }
        //                 else {
        //                     dispatch({
        //                         type: GET_ORDERS_SUCCESS,
        //                         payload:{
        //                             orders: response?.data.Orders
        //                         }
        //                     })
        //                 }
        //         },
        //         () => {
        //         console.log('error')
        //         },
        //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        //     );
        // }
        // else{
        //     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //           Geolocation.getCurrentPosition(
        //               async(position) => {
        //                 const response = await API.getOrders(complete,position.coords.latitude,position.coords.longitude);
        //                 if (response?.data?.status?.status === "fail") {
                            // dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        //                 }
        //                 else {
        //                     dispatch({
        //                         type: GET_ORDERS_SUCCESS,
        //                         payload:{
        //                             orders: response?.data.Orders
        //                         }
        //                     })
        //                 }
        //               },
        //               () => {
        //               console.log('error')
        //               },
        //               { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        //           );
        //       }       
        //       else {
        //           alert("Location permission denied");
        //       } 
        // }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_ORDERS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getNotifications = () => async (dispatch) => {
    dispatch({
        type: GET_NOTIFICATIONS_REQUEST
    })
    try {
        const response = await API.getNotifications();
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch({
                type: GET_NOTIFICATIONS_SUCCESS,
                payload:{
                    notifications: response?.data.Notifications
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_NOTIFICATIONS_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const getCategories = () => async (dispatch) => {
    dispatch({
        type: GET_CATEGORIES_REQUEST
    })
    try {
        const response = await API.getCategories();
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch({
                type: GET_CATEGORIES_SUCCESS,
                payload:{
                    categories: response?.data.Categories
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: GET_CATEGORIES_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const toggleFav = (ref_id) => async (dispatch) => {
    dispatch({
        type: TOGGLE_FAV_REQUEST
    })
    try {
        const response = await API.toggleFav(ref_id);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: TOGGLE_FAV_SUCCESS,
                payload:{
                    ref_id
                }
            })
        }
    } catch (err) {
        console.log(err, 'errrr')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: TOGGLE_FAV_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const readNotification = (notification_id) => async (dispatch) => {
    dispatch({
        type: READ_NOTIFICATION_REQUEST
    })
    try {
        const response = await API.readNotification(notification_id);
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: READ_NOTIFICATION_SUCCESS,
                payload:{
                    notification_id
                }
            })
        }
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: READ_NOTIFICATION_FAILURE,
            payload: {
                errorMsg: err
            }
        })
    }
}
export const addToCart = (item, quantity, color, delivery, deliveryItem, option, activeOption) => async (dispatch) => {
    console.warn(activeOption , 'activeOptionnnnnnnn')
    dispatch({
        type: SHOW_MODAL
    })
    try {
        const response = await API.addToCart(item, quantity, color, delivery, deliveryItem, option, activeOption);
        dispatch(ToastActionsCreators.displayInfo('Added To cart', 2000))
        dispatch({
            type: CLOSE_MODAL,
        })
        navigate('Cart')
        
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: CLOSE_MODAL,
        })
        // dispatch({
        //     type: READ_NOTIFICATION_FAILURE,
        //     payload: {
        //         errorMsg: err
        //     }
        // })
    }
}
export const storeOrder = (order, address, lat, lng) => async (dispatch) => {
    console.log(order , 'orderorderorderorder')
    dispatch({
        type: STORE_ORDER_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const currentdate = new Date()
        const order_date = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getDate() 
        const order_time =  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds()
        const response = await API.storeOrder(order, order_date, order_time, address, lat, lng);
        console.log(response?.data, 'ddddddddddddddd')
        if (response?.data?.status?.status === "fail") {
            console.log(response?.data)
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message[0], 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            await deviceStorage.saveItem('cart',JSON.stringify({'cart':[]}))
            dispatch({
                type: STORE_ORDER_SUCCESS,
            })
            navigate('Orders')
        }
        dispatch({ type: CLOSE_MODAL })
    } catch (err) {
        console.log(err.message, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: STORE_ORDER_FAILURE,
        })
        dispatch({ type: CLOSE_MODAL })
    }
}
export const updateOrder = (order_id, status) => async (dispatch) => {
    dispatch({
        type: UPDATE_ORDER_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
        const response = await API.updateOrder(order_id, status);
        console.log(response?.data , 'resssssss')
        if (response?.data?.status?.status === "fail") {
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message, 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: UPDATE_ORDER_SUCCESS,
            })
        }
        dispatch({ type: CLOSE_MODAL })
    } catch (err) {
        console.log(err, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: UPDATE_ORDER_FAILURE,
        })
        dispatch({ type: CLOSE_MODAL })
    }
}
export const startOrderDelivery = (order_id, lat, lng) => async (dispatch) => {
    console.log(order_id , 'order_idorder_idorder_id')
    // dispatch({
    //     type: START_ORDER_REQUEST
    // })
    // try {
    //     const response = await FIREBASE.startOrder(order_id,lat, lng);
    //     dispatch({ type: CLOSE_MODAL })
    // } catch (err) {
    //     console.log(err, 'err')
        // dispatch(ToastActionsCreators.displayError('Network Error', 2000))
    //     dispatch({
    //         type: START_ORDER_FAILURE,
    //     })
    //     dispatch({ type: CLOSE_MODAL })
    // }
}

export const addLocation = (lat, lng, address) => async (dispatch) => {
    dispatch({
        type: ADD_LOCATION_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
       const response = await API.addLocation(lat, lng, address);
        if (response?.data?.status?.status === "fail") {
            console.log(response?.data)
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message[0], 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: ADD_LOCATION_SUCCESS,
            })
            navigate('Locations')
        }
        dispatch({ type: CLOSE_MODAL })
    } catch (err) {
        console.log(err.message, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: ADD_LOCATION_FAILURE,
        })
        dispatch({ type: CLOSE_MODAL })
    }
}
export const hasPayment = () => async (dispatch) => {
    
    dispatch({
        type: HAS_PAYMENT_REQUEST
    })
    dispatch({ type: SHOW_MODAL })
    try {
       const response = await API.hasPayment();
        if (response?.data?.status?.status === "fail") {
            console.log(response?.data)
            dispatch({
                type: HAS_PAYMENT_SUCCESS,
                payload:{
                    showCard:true
                }
            })
            dispatch(ToastActionsCreators.displayError(response?.data?.status?.message[0], 2000))
        }
        else {
            dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
            dispatch({
                type: HAS_PAYMENT_SUCCESS,
                payload:{
                    showCard:false
                }
            })
        }
        dispatch({ type: CLOSE_MODAL })
    } catch (err) {
        console.log(err.message, 'err')
        dispatch(ToastActionsCreators.displayError('Network Error', 2000))
        dispatch({
            type: HAS_PAYMENT_FAILURE,
        })
        dispatch({ type: CLOSE_MODAL })
    }
}
export const confirmPayment = (showCard) => async (dispatch) => {
    console.log('test')
   dispatch({
        type: HAS_PAYMENT_SUCCESS,
        payload:{
            showCard:false
        }
    }) 
    
    // dispatch({
    //     type: HAS_PAYMENT_REQUEST
    // })
    // dispatch({ type: SHOW_MODAL })
    // try {
    //    const response = await API.hasPayment();
    //     if (response?.data?.status?.status === "fail") {
    //         console.log(response?.data)
    //         dispatch({
    //             type: HAS_PAYMENT_SUCCESS,
    //             payload:{
    //                 showCard:true
    //             }
    //         })
            // dispatch(ToastActionsCreators.displayError(response?.data?.status?.message[0], 2000))
    //     }
    //     else {
            // dispatch(ToastActionsCreators.displayInfo(response?.data?.status?.message[0], 2000))
    //         dispatch({
    //             type: HAS_PAYMENT_SUCCESS,
    //             payload:{
    //                 showCard:false
    //             }
    //         })
    //     }
    //     dispatch({ type: CLOSE_MODAL })
    // } catch (err) {
    //     console.log(err.message, 'err')
        // dispatch(ToastActionsCreators.displayError('Network Error', 2000))
    //     dispatch({
    //         type: HAS_PAYMENT_FAILURE,
    //     })
    //     dispatch({ type: CLOSE_MODAL })
    // }
}