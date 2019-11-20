import { API_CREATE_POST, API_GET_POSTS, API_CREATE_VIDEOPOST } from '../config/endpoints-conf';
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

export const getAllPosts = (getUserIdToken) => (queryString) => {
    const params = {
        is_blog: queryString.filter,
        tags: queryString.tag,
    };
    
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTS, {
                params,
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

export const createVideoPost = (getUserIdToken) => (json) =>  {
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.post(API_CREATE_VIDEOPOST, json , {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Authorization': idToken
                        }
                    }).then(res => {
                        console.log("res", res);
                    }).catch(err => {
                        console.log("ERR: " + err);
                    })
        })
}

export const getPostDetail = (getUserIdToken) => (id) =>  {
    
    return getUserIdToken()
        .then(data => {
            const idToken = data.idToken;
            return axios.get(API_GET_POSTS + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': idToken
                }
            }).then(res => {
                return res.data
            }).catch(err => {
                console.log("ERR: " + err);
            })
        })
}