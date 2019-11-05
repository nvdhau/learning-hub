import { 
    AUTH_SIGNUP_USER
} from '../config/endpoints-conf';

const initialState = {
    is_authenticated: false,
    auth_processing: false,
    auth_message: {},
};
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "AUTH_PROCESSING":
            return {...state, auth_processing: action.payload}
        case AUTH_SIGNUP_USER:
            return {...state, 
                auth_processing: action.payload.auth_processing,
                auth_message: { 
                    message: action.payload.auth_message, 
                    success: action.payload.success
                }
            };
        default:
            return state;
    }
}

export default authReducer;