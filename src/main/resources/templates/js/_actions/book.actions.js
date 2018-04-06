import {bookConstants} from '../_constants';
import {bookService} from '../_services';
import {alertActions} from './';
import {history} from "../_helpers/history";

export const bookActions = {
    getAll,
    getBook,
    create,
    update,
    sort,
    _delete: _delete
};

function getAll() {
    return dispatch => {
        dispatch(request());

        bookService.getAll()
            .then(
                books => {
                    dispatch(success(books));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request() {
        return {type: bookConstants.GET_ALL_BOOKS_REQUEST}
    }

    function success(books) {
        return {type: bookConstants.GET_ALL_BOOKS_SUCCESS, books}
    }

    function failure(error) {
        return {type: bookConstants.GET_ALL_BOOKS_FAILURE, error}
    }
}

function getBook(bookId) {
    return dispatch => {
        dispatch(request({bookId}));

        bookService.getBook(bookId)
            .then(
                book => {
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error));
                    history.push('/404');
                }
            );
    };

    function request(bookId) {
        return {type: bookConstants.GET_BOOK_REQUEST, bookId}
    }

    function success(book) {
        return {type: bookConstants.GET_BOOK_SUCCESS, book}
    }

    function failure(error) {
        return {type: bookConstants.GET_BOOK_FAILURE, error}
    }
}

function create(book) {
    return dispatch => {
        dispatch(request({book}));

        bookService.create(book)
            .then(
                book => {
                    dispatch(success(book));
                    history.push('/books/' + book.id);
                },
                error => {
                    dispatch(failure(error));
                    history.push('/404');
                }
            );
    };

    function request(book) {
        return {type: bookConstants.CREATE_BOOK_REQUEST, book}
    }

    function success(book) {
        return {type: bookConstants.CREATE_BOOK_SUCCESS, book}
    }

    function failure(error) {
        return {type: bookConstants.CREATE_BOOK_FAILURE, error}
    }
}

function update(book) {
    return dispatch => {
        dispatch(request({book}));

        bookService.update(book)
            .then(
                book => {
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error));
                    history.push('/404');
                }
            );
    };

    function request(book) {
        return {type: bookConstants.UPDATE_BOOK_REQUEST, book}
    }

    function success(book) {
        return {type: bookConstants.UPDATE_BOOK_SUCCESS, book}
    }

    function failure(error) {
        return {type: bookConstants.UPDATE_BOOK_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        bookService._delete(id)
            .then(
                book => {
                    dispatch(success(id));
                    history.push('/');
                },
                error => {
                    dispatch(failure(id, error));
                }
            );
    };

    function request(id) {
        return {type: bookConstants.DELETE_BOOK_REQUEST, id}
    }

    function success(id) {
        return {type: bookConstants.DELETE_BOOK_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: bookConstants.DELETE_BOOK_FAILURE, id, error}
    }
}

function sort(key, order) {
    return dispatch => {
        dispatch(success({key: key, order: order}));
    };

    function success(sort) {
        return {type: bookConstants.BOOK_SORT, sort}
    }
}