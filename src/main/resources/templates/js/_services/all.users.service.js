import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const allUsersService = {
    getAll,
    getUser,
    update,
    _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'admin/getallusers',
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't fetch users");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't fetch users");
    });
}

function getUser(userId) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin?id=' + userId;
    else
        url = linkConstants.URL + 'user?id=' + userId;
    const requestOptions = {
        method: 'GET',
        url: url,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't fetch users");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't fetch users");
    });
}

function update(user) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/updateuser';
    else
        url = linkConstants.URL + 'user/updateuser';
    const requestOptions = {
        method: 'PUT',
        url: url,
        headers: {
            'Content-Type': 'application/json', ...authHeader()
        },
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: user,
        crossDomain: true
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't update users");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't update users");
    });
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