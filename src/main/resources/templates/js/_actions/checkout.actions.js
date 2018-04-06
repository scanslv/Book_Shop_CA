import {checkoutConstants} from '../_constants';
import {checkoutService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const checkoutActions = {
    buy
};

function buy(id, books) {
    return dispatch => {
        dispatch(request(id));

        checkoutService.buy(id, books)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/done');
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: checkoutConstants.BUY_REQUEST, id}
    }

    function success(user) {
        return {type: checkoutConstants.BUY_SUCCESS, user}
    }

    function failure(id, error) {
        return {type: checkoutConstants.BUY_FAILURE, id, error}
    }
}