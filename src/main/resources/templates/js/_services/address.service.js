import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const addressService = {
    create,
    update,
    _delete
};

function create(id, address) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/createaddress?id=' + id;
    else
        url = linkConstants.URL + 'address?id=' + id;
    const requestOptions = {
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: address
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't create address");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't create address");
    });
}

function update(id, address) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/updateaddress?id=' + id;
    else
        url = linkConstants.URL + 'address?id=' + id;
    const requestOptions = {
        method: 'PUT',
        url: url,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: address
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't update address");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't update address");
    });
}

function _delete(user_id) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/deleteaddress?id=' + user_id;
    else
        url = linkConstants.URL + 'address?id=' + user_id;
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
            return Promise.reject("Can't delete address");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't delete address");
    });
}