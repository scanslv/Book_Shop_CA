import {basketConstants} from '../_constants';

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const defaultSortKey = 'title';
const defaultSortOrder = SORT_ASC;

const initialState = {
    booksInBasket: [],
    sortKey: defaultSortKey,
    sortOrder: defaultSortOrder
};

export function basket(state = initialState, action) {
    switch (action.type) {
        case basketConstants.ADD_BOOK_SUCCESS:
            return {
                ...state,
                booksInBasket: addBook(state, action.book)
            };
        case basketConstants.REMOVE_BOOK_SUCCESS:
            return {
                ...state,
                booksInBasket: state.booksInBasket.filter(obj => obj.book !== action.book)
            };
        case basketConstants.BASKET_BOOK_SORT:
            return {
                ...state,
                sortKey: action.sort.key,
                sortOrder: action.sort.order
            };
        default:
            return state
    }
}

function addBook(state, theBook) {
    let newState;
    let found = false;

    newState = state.booksInBasket.map((aBookInBasket) => {
            if (aBookInBasket.book.id === theBook.id) {
                found = true;
                return {...aBookInBasket, quantity: (aBookInBasket.quantity) + 1};
            } else
                return aBookInBasket;

        }
    );

    if (!found) {
        newState = [...state.booksInBasket, {book: theBook, quantity: 1}]
    }
    return newState;
}