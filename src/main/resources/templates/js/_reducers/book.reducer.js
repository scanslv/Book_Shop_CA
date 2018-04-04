import {bookConstants} from '../_constants';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const defaultSortKey = 'title';
const defaultSortOrder = SORT_ASC;

const initialState = {
    gettingBooks: true,
    sortKey: defaultSortKey,
    sortOrder: defaultSortOrder
};

export function book(state = initialState, action) {
    switch (action.type) {
        case bookConstants.GET_ALL_BOOKS_REQUEST:
            return {
                ...state,
                gettingBooks: true
            };
        case bookConstants.GET_ALL_BOOKS_SUCCESS:
            return {
                ...state,
                gettingBooks: false,
                books: action.books
            };
        case bookConstants.GET_ALL_BOOKS_FAILURE:
            return {};
        case bookConstants.GET_BOOK_REQUEST:
            return {
                gettingBook: true
            };
        case bookConstants.GET_BOOK_SUCCESS:
            return {
                gettingBook: false,
                book: action.book
            };
        case bookConstants.GET_BOOK_FAILURE:
            return {};
        case bookConstants.CREATE_BOOK_REQUEST:
            return {
                creatingBook: true
            };
        case bookConstants.CREATE_BOOK_SUCCESS:
            return {
                creatingBook: false,
                book: action.book
            };
        case bookConstants.CREATE_BOOK_FAILURE:
            return {};
        case bookConstants.UPDATE_BOOK_REQUEST:
            return {
                updatingBook: true
            };
        case bookConstants.UPDATE_BOOK_SUCCESS:
            return {
                updatingBook: false,
                book: action.book
            };
        case bookConstants.UPDATE_BOOK_FAILURE:
            return {};
        case bookConstants.DELETE_BOOK_REQUEST:
            return {
                deletingBook: true
            };
        case bookConstants.DELETE_BOOK_SUCCESS:
            return {
                deletingBook: false,
                book: action.book
            };
        case bookConstants.DELETE_BOOK_FAILURE:
            return {};
        case bookConstants.BOOK_SORT:
            return {
                ...state,
                sortKey: action.sort.key,
                sortOrder: action.sort.order
            };
        default:
            return state
    }
}