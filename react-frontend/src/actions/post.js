import { API_CREATE_POST, API_GET_POSTS, API_GET_TAGS } from '../config/endpoints-conf';
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

export const getAllPosts = (getUserIdToken) => (filter) => {
    console.log('my filter', filter);
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTS + '?filter=' + filter, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        return res.data
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        }).catch(err => {
            console.log(err);
        })
}