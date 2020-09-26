import axios from 'axios';
import {USER_SERVER} from '../components/Config'
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
} from './types';

export const loginUser = (dataToSubmit)=> {
    const request = axios.post(`${USER_SERVER}login`, dataToSubmit)
        .then(response => response.data);
    return {
        type: LOGIN_USER,
        payload: request
    }
};

export const registerUser = (dataToSubmit) => {
    const request = axios.post(`${USER_SERVER}register`,dataToSubmit)
        .then(res => res.data);
    return {
        type: REGISTER_USER,
        payload: request
    }
};

export const authCheck = () => {
    const request = axios.get(`${USER_SERVER}auth`)
        .then(res=>res.data);
    return {
        type: AUTH_USER,
        payload: request
    }
};



