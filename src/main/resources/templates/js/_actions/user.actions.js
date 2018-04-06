import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    _delete: _delete,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    if (localStorage.getItem('url')) {
                        history.push('/basket');
                        localStorage.removeItem('url');
                    } else
                        history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    userService.logout();
    return {type: userConstants.LOGOUT};
}

function register(user) {
    return dispatch => {
        dispatch(emailRequest(user.email));

        userService.checkEmail(user.email)
            .then(
                email => {
                    dispatch(emailSuccess(email));
                    dispatch(request(user));
                    userService.register(user).then(
                        user1 => {
                            dispatch(success(user1));
                            dispatch(loginRequest(user));
                            userService.login(user.email, user.password)
                                .then(
                                    user => {
                                        dispatch(loginSuccess(user));
                                        history.push('/');
                                    },
                                    error => {
                                        dispatch(loginFailure(error));
                                        dispatch(alertActions.error(error));
                                    }
                                );
                        },
                        error => {
                            dispatch(failure(error));
                            dispatch(alertActions.error(error));
                        }
                    );
                },
                error => {
                    dispatch(emailFailure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) {
        return {type: userConstants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }

    function emailRequest(email) {
        return {type: userConstants.EMAIL_CHECK_REQUEST, email}
    }

    function emailSuccess(email) {
        return {type: userConstants.EMAIL_CHECK_SUCCESS, email}
    }

    function emailFailure(error) {
        return {type: userConstants.EMAIL_CHECK_FAILURE, error}
    }

    function loginRequest(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function loginSuccess(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function loginFailure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService._delete(id)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/logout');
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: userConstants.DELETE_REQUEST, id}
    }

    function success(user) {
        return {type: userConstants.DELETE_SUCCESS, user}
    }

    function failure(id, error) {
        return {type: userConstants.DELETE_FAILURE, id, error}
    }
}