// ACTION 
export const AUTH_SIGNUP_USER = 'AUTH_SIGNUP_USER'; 
export const AUTH_LOGIN_USER = 'AUTH_LOGIN_USER';
export const AUTH_PROCESSING  = 'AUTH_PROCESSING ';


// create new user
export const API_CREATE_USER = process.env.REACT_APP_ENDPOINT_CREATE_USER ? process.env.REACT_APP_ENDPOINT_CREATE_USER : "http://127.0.0.1:5000/api/users/create";

