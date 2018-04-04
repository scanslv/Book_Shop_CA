import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const userService = {
    login,
    logout,
    getSummary,
    checkEmail,
    register,
    _delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        url: linkConstants.URL + 'login',
        headers: {'Content-Type': 'application/json'},
        data: {
            email: email,
            password: password
        },
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.headers.authorization) {
            return Promise.reject("Username or password is incorrect");
        }

        const token = response.headers.authorization;

        return fetchUser(email, token);
    }).catch(error => {
        return Promise.reject("Username or password is incorrect");
    });
}

function checkEmail(email) {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'user/checkemail?email=' + email,
        headers: {'Content-Type': 'application/json'},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (response.status === 202) {
            return Promise.reject("Email already registered");
        }
        return Promise.resolve(email)
    }).catch(error => {
        return Promise.reject("Email already registered");
    });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        url: linkConstants.URL + 'user/register',
        headers: {'Content-Type': 'application/json'},
        data: user,
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't register");
    });
}

function fetchUser(email, token) {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'user?email=' + email,
        headers: {'Content-Type': 'application/json', 'Authorization': token},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Username or password is incorrect");
        }
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
    }).catch(error => {
        return Promise.reject("Username or password is incorrect");
    });
}

function getSummary(user) {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'admin/getsummary?id=' + user.id,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("'Method Forbidden");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Method Forbidden");
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/deleteuser?id=' + id;
    else
        url = linkConstants.URL + 'user?id=' + id;
    const requestOptions = {
        method: 'DELETE',
        url: url,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't delete");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't delete");
    });
}