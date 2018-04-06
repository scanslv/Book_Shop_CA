import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const checkoutService = {
    buy
};

function buy(id, books) {
    const requestOptions = {
        method: 'PUT',
        url: linkConstants.URL + 'user/buy?id=' + id,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: books
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't purchase books");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't purchase books");
    });
}