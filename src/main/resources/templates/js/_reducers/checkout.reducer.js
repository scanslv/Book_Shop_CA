import {checkoutConstants} from '../_constants';

const initialState = {
    paying: false
};

export function checkout(state = initialState, action) {
    switch (action.type) {
        case checkoutConstants.BUY_REQUEST:
            return {
                paying: true
            };
        case checkoutConstants.BUY_SUCCESS:
            return {
                paying: false
            };
        case checkoutConstants.BUY_FAILURE:
            return {};
        default:
            return state
    }

}