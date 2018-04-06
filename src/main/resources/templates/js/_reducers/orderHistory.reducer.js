import {historyConstants} from '../_constants';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const defaultSortKey = 'title';
const defaultSortOrder = SORT_ASC;

const initialState = {
    sortKey: defaultSortKey,
    sortOrder: defaultSortOrder
};

export function orderHistory(state = initialState, action) {
    switch (action.type) {
        case historyConstants.HISTORY_BOOK_SORT:
            return {
                ...state,
                sortKey: action.sort.key,
                sortOrder: action.sort.order
            };
        default:
            return state
    }
}