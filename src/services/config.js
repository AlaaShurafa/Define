import axios from 'axios';
import deviceStorage from './deviceStorage';

export const url = 'https://www.defin-professional.com/'
axiosApiInstance = axios.create({
    baseURL:url,
}) ;
axiosApiInstance.interceptors.request.use(
    async config => {
    const access_token = await deviceStorage.getItem('access_token')
    console.log(access_token)
    const lang = await deviceStorage.getItem('lang')
        //   const keys = JSON.parse(value)
      config.headers = { 
        'Authorization': `Bearer ${access_token}`,
        'Accept': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        'X-localization': lang
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });
export default axiosApiInstance;