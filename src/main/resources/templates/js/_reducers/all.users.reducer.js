import { allUsersConstants } from '../_constants';

const initialState = {
    gettingUsers: true
};

export function allUsers(state = initialState, action) {
    switch (action.type) {
        case allUsersConstants.GET_ALL_USERS_REQUEST:
            return {
                gettingUsers: true
            };
        case allUsersConstants.GET_ALL_USERS_SUCCESS:
            return {
                gettingUsers: false,
                users: action.users
            };
        case allUsersConstants.GET_ALL_USERS_FAILURE:
            return {};
        case allUsersConstants.SHOW_USER_REQUEST:
            return {
                gettingUser: true
            };
        case allUsersConstants.SHOW_USER_SUCCESS:
            return {
                gettingUser: false,
                user: action.user
            };
        case allUsersConstants.SHOW_USER_FAILURE:
            return {};
        case allUsersConstants.UPDATE_USER_REQUEST:
            return {
                gettingUser: true
            };
        case allUsersConstants.UPDATE_USER_SUCCESS:
            return {
                gettingUser: false,
                user: action.user
            };
        case allUsersConstants.DELETE_USER_FAILURE:
            return {};
        case allUsersConstants.DELETE_USER_REQUEST:
            return {
                gettingUser: true
            };
        case allUsersConstants.DELETE_USER_SUCCESS:
            return {
                gettingUser: false
            };
        case allUsersConstants.UPDATE_USER_FAILURE:
            return {};
        default:
            return state
    }
}