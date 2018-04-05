import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const searchService = {
    search
};

function search(searchQuery) {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'book/search?query=' + searchQuery,
        headers: {'Content-Type': 'application/json'},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't find books");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't find books");
    });
}