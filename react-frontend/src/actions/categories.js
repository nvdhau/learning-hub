import { API_GET_CATEGORIES } from '../config/endpoints-conf';
import axios from 'axios';

// firebase sign up account
export const getCategories = () =>  {
    return axios.get(API_GET_CATEGORIES, null , {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            const categories = res.data.map(value => {
                return {'key': value.id, 'value': value.name}
            });

            return categories;
        }).catch(err => {
            console.log("ERR: " + err);
        })
}