import {cardConstants} from '../_constants';
import {cardService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const cardActions = {
    create,
    update,
    _delete
};

function create(id, card) {
    return dispatch => {
        dispatch(request({card}));

        cardService.create(id, card)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('card')
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(card) {
        return {type: cardConstants.CREATE_CARD_REQUEST, card}
    }

    function success(user) {
        return {type: cardConstants.CREATE_CARD_SUCCESS, user}
    }

    function failure(error) {
        return {type: cardConstants.CREATE_CARD_FAILURE, error}
    }
}

function update(id, card) {
    return dispatch => {
        dispatch(request({card}));

        cardService.update(id, card)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(card) {
        return {type: cardConstants.UPDATE_CARD_REQUEST, card}
    }

    function success(user) {
        return {type: cardConstants.UPDATE_CARD_SUCCESS, user}
    }

    function failure(error) {
        return {type: cardConstants.UPDATE_CARD_FAILURE, error}
    }
}

function _delete(user_id) {
    return dispatch => {
        dispatch(request({user_id}));

        cardService._delete(user_id)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/users/' + user_id)
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user_id) {
        return {type: cardConstants.DELETE_CARD_REQUEST, user_id}
    }

    function success(user) {
        return {type: cardConstants.DELETE_CARD_SUCCESS, user}
    }

    function failure(error) {
        return {type: cardConstants.DELETE_CARD_FAILURE, error}
    }
}