import { API_GET_TAGS } from '../config/endpoints-conf';
import axios from 'axios';

// firebase sign up account
export const getTags = () =>  {
    console.log("tagssss", API_GET_TAGS);
    return axios.get(API_GET_TAGS, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log('res', res);
            return res.data
        }).catch(err => {
            console.log("ERR: " + err);
        })
}