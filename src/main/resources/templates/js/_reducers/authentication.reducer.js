import {userConstants, addressConstants, cardConstants, checkoutConstants} from '../_constants';

// localStorage.clear();
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case addressConstants.CREATE_ADDRESS_THIS_SUCCESS:
        case addressConstants.UPDATE_ADDRESS_THIS_SUCCESS:
        case addressConstants.DELETE_ADDRESS_THIS_SUCCESS:
        case cardConstants.CREATE_CARD_THIS_SUCCESS:
        case cardConstants.UPDATE_CARD_THIS_SUCCESS:
        case cardConstants.DELETE_CARD_THIS_SUCCESS:
        case checkoutConstants.BUY_SUCCESS:
        case userConstants.LOGIN_SUCCESS:
            localStorage.setItem('user', JSON.stringify(action.user));
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