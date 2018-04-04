import {userConstants} from '../_constants';

export function user(state = {}, action) {
    switch (action.type) {
        case userConstants.DELETE_REQUEST:
            return {
                deleting: true
            };
        case userConstants.DELETE_SUCCESS:
            return {};
        case userConstants.DELETE_FAILURE:
            // remove 'deleting:true' property and add 'deleteError:[error]' property to user
            return {};
        default:
            return state
    }
}