import { Platform } from 'react-native'
import axios from './config'
import deviceStorage from './deviceStorage'
export const logIn = async (email, password, user_type, device_token) => {
    console.log(device_token , 'device_tokendevice_tokendevice_tokendevice_token')
    // const device_token = deviceStorage.getItem('userID')
    return (
        axios.post('api/auth/login', {
            email,
            password,
            user_type:1,
            device_type:Platform.OS,
            device_token

        })
    )
}

export const logout = async () => {
    return (
        axios.post('api/auth/logout')
    )
}

export const signUp = (email, password, name, mobile, country_id, cvr_nr, device_token) => {
    return axios.post('api/auth/signup', {
        email,
        password,
        name,
        mobile,
        type: 1,
        country_id,
        city_id:1,
        device_token,
        device_type: Platform.OS,
        cvr_nr
    })
}
export const updateUserApi = (email, name, mobile, avatar) => {
    console.log(avatar , 'aaavvvv')
    let formData = new FormData();
    formData.append('email', email);
    formData.append('name', name);
    formData.append('mobile', mobile);
    if(avatar){
          formData.append('avatar',  {
            name: 'avatar',
            type: avatar.mime,
            uri:
              Platform.OS === "android" ? avatar.path : avatar.path.replace("file://", "")
          });
      }
    return axios.post('api/auth/update', formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
            'Accept':'application/json'
          }
        }
    )
}
export const ChangeUserPassword = (cPassword, password, rePassword) => {
    return axios.post('api/auth/change_password', {
        password,
        old_password: cPassword,
        password_confirmation: rePassword,
    })
}
export const ResetUserPassword = (password, rePassword, email, code) => {
    return axios.post('api/auth/reset_password', {
        password,
        password_confirmation: rePassword,
        email,
        code
    })
}
export const getUserData = async () => {
    return await axios.get('api/auth/me')
}

export const sendEmailCodeApi = async (email) => {
    return await axios.post('api/auth/forget_password',
        {
            email
        })
}
export const checkEmailCodeApi = async (email,code) => {
    return await axios.post('api/auth/check_reset_code',
        {
            email,
            code
        })
}

//app
export const getInstall = async () => {
    return await axios.get('api/home/install')
}
export const getCategories = async () => {
    return await axios.get('api/home/categories')
}
export const contactUs = async (title,message) => {
    return await axios.post('api/tickets/store',
        {
            title,
            message
        })
}
export const getHome = async (provider_type = 1) => {
    return await axios.get('api/home/providers',{
        params : {
            provider_type,
            per_page:100
        }
    })
}
export const getFav = async () => {
    return await axios.get('api/products',{
        params : {
            // favourite:true,
            per_page:100
        }
    })
}
export const toggleFav = async (product_id) => {
    return await axios.post('api/products/toggle_favourite',{
        product_id
    })
}
export const getFoods = async (category_id = null, most_ordered = null, per_page = 100, q, page = 1) => {
   console.log(q , 'qqq', category_id)
    let params = {}
    category_id ? params['category_id'] = category_id : null
    most_ordered ? params['most_ordered'] = most_ordered : null
    console.log(params , 'params')
    return await axios.get('api/products',{
        params : {
            ...params,
            per_page,
            category_id,
            page,
            q
        }
    })
}
export const getOrders = async (complete) => {
    console.warn('get orrders', complete)
    return await axios.get('api/orders',{
        params:{
            // per_page:100,
            is_completed:complete,
            // lat,
            // lng
        }
    })
}
export const getNotifications = async () => {
    return await axios.get('api/notifications',{
        params:{
            per_page:100
        }
    })
}
export const readNotification = async (notification_id) => {
    return await axios.post('api/notifications/read',{
            notification_id
    })
}
export const addToCart = async (item, quantity, color, delivery, deliveryItem, option, activeOption,price) => {
    const { id } = item
    const itemCart = {
        ...item,
        quantity,
        // quantity,
        // logo,
        color,
        delivery, deliveryItem, option, activeOption,
        price
    }
    // deviceStorage.removeItem('cart')
    let cart = await deviceStorage.getItem('cart')
    if(cart){
        cart = JSON.parse(cart)
        const elementIndex = cart.cart.findIndex(element => element.id == id )
        if(elementIndex != -1){
            cart.cart[elementIndex].quantity = quantity
            cart.cart[elementIndex].price = price
            cart = JSON.stringify(cart)
            deviceStorage.saveItem('cart',cart)
        }
        else{
            cart={"cart":[...cart.cart, itemCart]}
            cart = JSON.stringify(cart)
            deviceStorage.saveItem('cart',cart)
        }
        
    }
    else{
        cart = JSON.stringify({'cart':[itemCart]})
        deviceStorage.saveItem('cart',cart)
    }
}
export const storeOrder = async (products,order_date, order_time, address, lat, lng) => {
    console.log(products, 'products')
    return await axios.post('api/orders/store',{
        products,
        order_date,
        order_time,
        address, lat, lng
    } )
}
export const updateOrder = async (order_id, status) => {
    return await axios.post('api/orders/update',{
        order_id, 
        status
    })
}
export const getLocations = async () => {
    return await axios.get('api/location',{
        params:{
            per_page:100
        }
    })
}
export const getTickets = async () => {
    return await axios.get('api/tickets',{
        params:{
            per_page:100
        }
    })
}
export const addLocation = async (lat, lng, address) => {
    return await axios.post('api/location/store',{
        lat,
        lng,
        address
    })
}
export const responseTicket = async (ticket_id,response) => {
    return await axios.post('api/tickets/response',
        {
            ticket_id,
            response
        })
}
export const hasPayment = async () => {
    console.error('api/payments/has_payment')
    return await axios.get('api/payments/has_payment')
}
export const addPayment = async (stripeToken) => {
    return await axios.post('api/payments/add_payment',{
        stripeToken
    })
}