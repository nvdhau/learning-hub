import { API_CREATE_POST } from '../config/endpoints-conf';
// import { getCurrentUserAuth } from './authenticate'
import axios from 'axios';

// firebase sign up account
export const createPost = (getUserIdToken) => (json) =>  {

    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.post(API_CREATE_POST, json , {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}