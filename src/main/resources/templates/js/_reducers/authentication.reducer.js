import {userConstants} from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {};
        case userConstants.LOGOUT:
            return {};
        case userConstants.REGISTER_REQUEST:
            return {registering: true};
        case userConstants.REGISTER_SUCCESS:
            return {};
        case userConstants.REGISTER_FAILURE:
            return {};
        case userConstants.EMAIL_CHECK_REQUEST:
            return {registering: true};
        case userConstants.EMAIL_CHECK_SUCCESS:
            return {registering: true,};
        case userConstants.EMAIL_CHECK_FAILURE:
            return {invalidEmail: true};
        default:
            return state
    }
}