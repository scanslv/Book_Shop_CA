import {allUsersConstants} from '../_constants';
import {allUsersService} from '../_services';
import {history} from "../_helpers/history";

export const allUsersActions = {
    getAll,
    getUser,
    update,
    _delete,
    sort
};

function getAll() {
    return dispatch => {
        dispatch(request());

        allUsersService.getAll()
            .then(
                users => dispatch(success(users)),
                error => {
                    dispatch(failure(error));
                    history.push('/404');
                }
            );
    };

    function request() {
        return {type: allUsersConstants.GET_ALL_USERS_REQUEST}
    }

    function success(users) {
        return {type: allUsersConstants.GET_ALL_USERS_SUCCESS, users}
    }

    function failure(error) {
        return {type: allUsersConstants.GET_ALL_USERS_FAILURE, error}
    }
}

function getUser(userId) {
    return dispatch => {
        dispatch(request({userId}));

        allUsersService.getUser(userId)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    history.push('/404');
                }
            );
    };

    function request(userId) {
        return {type: allUsersConstants.SHOW_USER_REQUEST, userId}
    }

    function success(user) {
        return {type: allUsersConstants.SHOW_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: allUsersConstants.SHOW_USER_FAILURE, error}
    }
}

function update(user) {
    return dispatch => {
        dispatch(request({user}));

        allUsersService.update(user)
            .then(
                user => {
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error));
                    history.push('/404')
                }
            );
    };

    function request(user) {
        return {type: allUsersConstants.UPDATE_USER_REQUEST, user}
    }

    function success(user) {
        return {type: allUsersConstants.UPDATE_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: allUsersConstants.UPDATE_USER_FAILURE, error}
    }
}

function _delete(id) {
    return dispatch => {
        dispatch(request({id}));

        allUsersService._delete(id)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/logout')
                },
                error => {
                    dispatch(failure(error));
                    history.push('/404')
                }
            );
    };

    function request(id) {
        return {type: allUsersConstants.DELETE_USER_REQUEST, id}
    }

    function success(user) {
        return {type: allUsersConstants.DELETE_USER_SUCCESS, user}
    }

    function failure(error) {
        return {type: allUsersConstants.DELETE_USER_FAILURE, error}
    }
}

function sort(key, order) {
    return dispatch => {
        dispatch(success({key: key, order: order}));
    };

    function success(sort) {
        return {type: allUsersConstants.USER_SORT, sort}
    }
}