import { AUTH_SIGNUP_USER, API_CREATE_USER } from '../config/endpoints-conf';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as firebase from 'firebase';
import 'firebase/auth';

// firebase config
const fireBaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID
};

const fireBaseApp = firebase.initializeApp(fireBaseConfig);

// firebase sign in account
export const doSignInWithEmailAndPassword = (email, password) => {
    fireBaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            console.log("AUTHENTICATED, DISPATCH TO REDUX");
            console.log(res);
        }).catch(err => {
            console.log("ERROR AUTHENTICATED");
            console.log(err);
        });
}

// firebase signout
export const doSignOut = () => {
    fireBaseApp.auth().signOut();
}

// get current Auth User
export const getCurrentUserAuth = () => {
    return new Promise ((resolve, reject) => {
        fireBaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                resolve({
                    displayName: user.displayName,
                    email: user.email
                })
            } else {
                resolve(null);
            }
        });
    })
}

// firebase sign up account
export const accountSignUp = (json) =>  {
    return dispatch => {
        dispatch({
            type: "AUTH_PROCESSING",
            payload: true
        });

        // call api
        axios.post(API_CREATE_USER, json, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const message = 'Successfully create account. Please login now';
            dispatch({
                type: AUTH_SIGNUP_USER,
                payload: { message, auth_processing: false, success: true}
            })
            toast.success(message);
        }).catch(err => {
            console.log("ERR: " + err);
            const message = 'Sorry! Unable to create an account';
            dispatch({
                type: AUTH_SIGNUP_USER,
                payload: { message, auth_processing: false, success: false}
            })
            toast.error(message);
        })
    }
}

export default fireBaseApp;