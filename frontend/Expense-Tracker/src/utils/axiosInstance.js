import axios from 'axios'
import { BASE_URL } from './apiPaths'


const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": 'application/json',
        Accept: 'application/json'
    }
});

//Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }

)

//response interceptor
axiosInstance.interceptors.request.use(
    (response) => {
        return response;
    },
    (error) => {
        //handle common error globally
        if(error.response.status === 400){
            //Redirect to login page
            window.location.href = '/login';
        }else if(error.response.status === 500){
            console.error("Server error. please try again later")
        } else if(error.response.status === 'ECONNABORTED'){
            console.error("Request timeOut. Please try again");
        }

        return Promise.reject(error);
    }
)

export default axiosInstance;