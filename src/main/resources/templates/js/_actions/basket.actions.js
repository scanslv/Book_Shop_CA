import {basketConstants} from '../_constants';
import {alertActions} from './';
import {history} from "../_helpers/history";

export const basketActions = {
    addBook,
    removeBook
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