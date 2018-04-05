import {searchConstants} from '../_constants';
import {searchService} from '../_services';
import {alertActions} from './';

export const searchActions = {
    search
};

function search(searchQuery) {
    return dispatch => {
        dispatch(request(searchQuery));

        searchService.search(searchQuery)
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
        return {type: searchConstants.SEARCH_BOOK_REQUEST}
    }

    function success(books) {
        return {type: searchConstants.SEARCH_BOOK_SUCCESS, books}
    }

    function failure(error) {
        return {type: searchConstants.SEARCH_BOOK_FAILURE, error}
    }
}