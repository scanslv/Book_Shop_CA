import {basketConstants} from '../_constants';

export const basketActions = {
    addBook,
    removeBook,
    sort
};

function addBook(book) {
    return dispatch => {
        dispatch(success(book));
    };

    function success(book) {
        return {type: basketConstants.ADD_BOOK_SUCCESS, book}
    }
}

function removeBook(book) {
    return dispatch => {
        dispatch(success(book));
    };

    function success(book) {
        return {type: basketConstants.REMOVE_BOOK_SUCCESS, book}
    }
}

function sort(key, order) {
    return dispatch => {
        dispatch(success({key: key, order: order}));
    };

    function success(sort) {
        return {type: basketConstants.BASKET_BOOK_SORT, sort}
    }
}