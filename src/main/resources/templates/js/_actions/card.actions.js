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
                    if (JSON.parse(localStorage.getItem('user')).id === parseInt(id))
                        dispatch(successThis(user));
                    else
                        dispatch(success(user));
                    if (localStorage.getItem('url') === 'basket') {
                        localStorage.removeItem('url');
                        history.push('/checkout');
                    }
                    else
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

    function successThis(user) {
        return {type: cardConstants.CREATE_CARD_THIS_SUCCESS, user}
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
                    if (JSON.parse(localStorage.getItem('user')).id === parseInt(id))
                        dispatch(successThis(user));
                    else
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

    function successThis(user) {
        return {type: cardConstants.UPDATE_CARD_THIS_SUCCESS, user}
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
                    if (JSON.parse(localStorage.getItem('user')).id === parseInt(user_id))
                        dispatch(successThis(user));
                    else
                        dispatch(success(user));
                    if (localStorage.getItem('url') === 'basket') {
                        localStorage.removeItem('url');
                        history.push('/checkout');
                    }
                    else
                        history.push('card')
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

    function successThis(user) {
        return {type: cardConstants.DELETE_CARD_THIS_SUCCESS, user}
    }

    function failure(error) {
        return {type: cardConstants.DELETE_CARD_FAILURE, error}
    }
}