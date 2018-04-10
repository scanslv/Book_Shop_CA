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
                response => {
                    if (response.error) {
                        dispatch(alertActions.error(response.error));
                        dispatch(successThis(response.user));
                    } else {
                        if (JSON.parse(localStorage.getItem('user')).id === parseInt(id))
                            dispatch(successThis(response.user));
                        else
                            dispatch(success(response.user));
                        if (localStorage.getItem('url') === 'basket') {
                            localStorage.removeItem('url');
                            history.push('/checkout');
                        }
                        else
                            history.push('/users/' + id)
                    }
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

    function successThis(user) {
        return {type: cardConstants.DELETE_CARD_THIS_SUCCESS, user}
    }

    function failure(error) {
        return {type: cardConstants.DELETE_CARD_FAILURE, error}
    }
}

function sameCard(oldCard, newCard) {
    if ((oldCard.id && newCard.id) && oldCard.id !== newCard.id)
        return false;
    if ((oldCard.type && newCard.type) && oldCard.type !== newCard.type)
        return false;
    if ((oldCard.number && newCard.number) && oldCard.number !== newCard.number)
        return false;
    if ((oldCard.expiryY && newCard.expiryY) && oldCard.expiryY !== newCard.expiryY)
        return false;
    if ((oldCard.expiryM && newCard.expiryM) && oldCard.expiryM !== newCard.expiryM)
        return false;
    if ((oldCard.cvv && newCard.cvv) && oldCard.cvv !== newCard.cvv)
        return false;


    return true;
}