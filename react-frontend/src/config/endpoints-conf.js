// ACTION 
export const AUTH_SIGNUP_USER = 'AUTH_SIGNUP_USER'; 
export const AUTH_LOGIN_USER = 'AUTH_LOGIN_USER';
export const AUTH_PROCESSING  = 'AUTH_PROCESSING';
export const SET_CATEGORIES  = 'SET_CATEGORIES';


// create new user
export const API_CREATE_USER = process.env.REACT_APP_ENDPOINT_CREATE_USER ? process.env.REACT_APP_ENDPOINT_CREATE_USER : "http://127.0.0.1:5000/api/users/create";
export const API_GET_CATEGORIES = process.env.REACT_APP_ENDPOINT_GET_CATEGORIES ? process.env.REACT_APP_ENDPOINT_GET_CATEGORIES : "http://127.0.0.1:5000/api/categories/";
export const API_CREATE_POST = process.env.REACT_APP_ENDPOINT_CREATE_POST ? process.env.REACT_APP_ENDPOINT_CREATE_POST : "http://127.0.0.1:5000/api/posts/create";
export const API_GET_TAGS = process.env.REACT_APP_ENDPOINT_GET_TAGS ? process.env.REACT_APP_ENDPOINT_GET_TAGS : "http://127.0.0.1:5000/api/tags/";

