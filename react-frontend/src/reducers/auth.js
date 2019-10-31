import { 
    AUTH_SIGNUP_USER
} from '../config/endpoints-conf';

const initialState = {
    is_authenticated: false,
    auth_message: {},
    
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SIGNUP_USER:
            return {...state, auth_message: action.payload };
        default:
            return state;
    }
}

export default authReducer;