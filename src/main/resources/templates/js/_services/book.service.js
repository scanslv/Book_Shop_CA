import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const bookService = {
    getAll,
    getBook,
    create,
    update,
    _delete: _delete
};

function getAll() {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'book/getall',
        headers: {'Content-Type': 'application/json'},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't get books");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't get books");
    });
}

function getBook(bookId) {
    const requestOptions = {
        method: 'GET',
        url: linkConstants.URL + 'book/getbook?id=' + bookId,
        headers: {'Content-Type': 'application/json'},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't get book");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't get book");
    });
}

function create(book) {
    const requestOptions = {
        method: 'POST',
        url: linkConstants.URL + 'book',
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: book
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't create book");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't create book");
    });
}

function update(book) {
    const requestOptions = {
        method: 'PUT',
        url: linkConstants.URL + 'book',
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: book
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't update book");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't update book");
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        url: linkConstants.URL + 'book?id=' + id,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type']
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't delete book");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't delete book");
    });
}