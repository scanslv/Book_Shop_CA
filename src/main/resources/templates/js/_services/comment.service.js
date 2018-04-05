import {authHeader} from '../_helpers';
import axios from 'axios';
import {linkConstants} from '../_constants';

export const commentService = {
    comment
};

function comment(user, book, comment) {
    const requestOptions = {
        method: 'POST',
        url: linkConstants.URL + 'comment?user_id=' + user.id + '&book_id=' + book.id,
        headers: {'Content-Type': 'application/json', ...authHeader()},
        allowedHeaders: ['Accept-Version', 'Authorization', 'Credentials', 'Content-Type'],
        data: comment
    };

    return axios(
        requestOptions
    ).then(response => {
        if (!response.data) {
            return Promise.reject("Can't create comment");
        }
        return response.data;
    }).catch(error => {
        return Promise.reject("Can't create comment");
    });
}