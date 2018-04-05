import {commentConstants} from '../_constants';
import {commentService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';

export const commentActions = {
    comment
};

function comment(user, book, comment) {
    return dispatch => {
        dispatch(request({comment}));

        commentService.comment(user, book, comment)
            .then(
                book => {
                    dispatch(success(book));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(comment) {
        return {type: commentConstants.POST_COMMENT_REQUEST, comment}
    }

    function success(book) {
        return {type: commentConstants.POST_COMMENT_SUCCESS, book}
    }

    function failure(error) {
        return {type: commentConstants.POST_COMMENT_FAILURE, error}
    }
}