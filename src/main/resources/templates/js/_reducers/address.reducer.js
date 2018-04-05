import {addressConstants} from '../_constants';

const initialState = {
    creatingAddress: false
};

export function address(state = initialState, action) {
    switch (action.type) {
        case addressConstants.CREATE_ADDRESS_REQUEST:
            return {
                creatingAddress: true
            };
        case addressConstants.CREATE_ADDRESS_SUCCESS:
            return {
                creatingAddress: false,
            };
        case addressConstants.CREATE_ADDRESS_FAILURE:
            return {};
        default:
            return state
    }

}