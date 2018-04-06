import {historyConstants} from '../_constants';

export const historyActions = {
    sort
};

function sort(key, order) {
    return dispatch => {
        dispatch(success({key: key, order: order}));
    };

    function success(sort) {
        return {type: historyConstants.HISTORY_BOOK_SORT, sort}
    }
}