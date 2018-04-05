import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const cardService = {
    create,
    update,
    _delete
};

function create(id, card) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/createcard?id=' + id;
    else
        url = linkConstants.URL + 'card?id=' + id;
    const requestOptions = {
        method: 'POST',
        url: url,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: card
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't create card");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't create card");
    });
}

function update(id, card) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/updatecard?id=' + id;
    else
        url = linkConstants.URL + 'card?id=' + id;
    const requestOptions = {
        method: 'PUT',
        url: url,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: card
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't update card");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't update card");
    });
}

function _delete(user_id) {
    let url;
    if (JSON.parse(localStorage.getItem('user')).role === 'ROLE_ADMIN')
        url = linkConstants.URL + 'admin/deletecard?id=' + user_id;
    else
        url = linkConstants.URL + 'card?id=' + user_id;
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
            return Promise.reject("Can't delete card");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't delete card");
    });
}