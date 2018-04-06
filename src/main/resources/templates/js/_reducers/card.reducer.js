import {cardConstants} from '../_constants';

const initialState = {
    creatingCard: false
};

export function card(state = initialState, action) {
    switch (action.type) {
        case cardConstants.CREATE_CARD_REQUEST:
            return {
                creatingCard: true
            };
        case cardConstants.CREATE_CARD_SUCCESS:
        case cardConstants.CREATE_CARD_THIS_SUCCESS:
            return {
                creatingCard: false,
            };
        case cardConstants.CREATE_CARD_FAILURE:
            return {};
        default:
            return state
    }

}