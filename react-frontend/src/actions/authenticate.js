import { AUTH_SIGNUP_USER, API_CREATE_USER } from '../config/endpoints-conf';
import axios from 'axios';
import { toast } from 'react-toastify';

export const accountSignUp = (json) =>  {
    return dispatch => {

        axios.post(API_CREATE_USER, json, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const message = 'Successfully create account. Please login now';
            dispatch({
                type: AUTH_SIGNUP_USER,
                payload: { success: true, message}
            })
            toast.success(message);
        }).catch(err => {
            console.log("ERR: " + err);
            const message = 'Sorry! Unable to create an account';
            dispatch({
                type: AUTH_SIGNUP_USER,
                payload: { success: false, message}
            })
            toast.error(message);
        })
    }
}