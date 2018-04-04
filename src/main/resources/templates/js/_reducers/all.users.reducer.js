import { allUsersConstants } from '../_constants';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const defaultSortKey = 'id';
const defaultSortOrder = SORT_ASC;

const initialState = {
    gettingUsers: true,
    sortKey: defaultSortKey,
    sortOrder: defaultSortOrder
};

export function allUsers(state = initialState, action) {
    switch (action.type) {
        case allUsersConstants.GET_ALL_USERS_REQUEST:
            return {
                ...state,
                gettingUsers: true
            };
        case allUsersConstants.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
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
        case allUsersConstants.USER_SORT:
            return {
                ...state,
                sortKey: action.sort.key,
                sortOrder: action.sort.order
            };
        default:
            return state
    }
}