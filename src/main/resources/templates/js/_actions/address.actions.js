import {addressConstants} from '../_constants';
import {addressService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const addressActions = {
    create,
    update,
    _delete
};

function create(id, address) {
    return dispatch => {
        dispatch(request({address}));

        addressService.create(id, address)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('address')
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(address) {
        return {type: addressConstants.CREATE_ADDRESS_REQUEST, address}
    }

    function success(user) {
        return {type: addressConstants.CREATE_ADDRESS_SUCCESS, user}
    }

    function failure(error) {
        return {type: addressConstants.CREATE_ADDRESS_FAILURE, error}
    }
}

function update(id, address) {
    return dispatch => {
        dispatch(request({address}));

        addressService.update(id, address)
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

    function request(address) {
        return {type: addressConstants.UPDATE_ADDRESS_REQUEST, address}
    }

    function success(user) {
        return {type: addressConstants.UPDATE_ADDRESS_SUCCESS, user}
    }

    function failure(error) {
        return {type: addressConstants.UPDATE_ADDRESS_FAILURE, error}
    }
}

function _delete(user_id) {
    return dispatch => {
        dispatch(request({user_id}));

        addressService._delete(user_id)
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
        return {type: addressConstants.DELETE_ADDRESS_REQUEST, user_id}
    }

    function success(user) {
        return {type: addressConstants.DELETE_ADDRESS_SUCCESS, user}
    }

    function failure(error) {
        return {type: addressConstants.DELETE_ADDRESS_FAILURE, error}
    }
}