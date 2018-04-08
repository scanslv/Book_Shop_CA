import {basketConstants, checkoutConstants} from '../_constants';
import {BooksInBasketSingleton} from "../_helpers/booksInBasketSingleton";

let booksInBasketSingleton = BooksInBasketSingleton.getInstance();

const SORT_ASC = 'asc';
const SORT_DESC = 'desc';

const defaultSortKey = 'title';
const defaultSortOrder = SORT_ASC;

const initialState = {
    booksInBasket: booksInBasketSingleton.getBooksInBasket(),
    sortKey: defaultSortKey,
    sortOrder: defaultSortOrder
};

export function basket(state = initialState, action) {
    switch (action.type) {
        case 'persist/REHYDRATE':{
            booksInBasketSingleton.setBooksInBasket(action.payload.basket.booksInBasket);
            return state
        }
        case basketConstants.ADD_BOOK_SUCCESS:
            booksInBasketSingleton.addBook(action.book);
            return {
                ...state,
                booksInBasket: booksInBasketSingleton.getBookList()
            };
        case basketConstants.REMOVE_BOOK_SUCCESS:
            booksInBasketSingleton.removeBook(action.book);
            return {
                ...state,
                booksInBasket: booksInBasketSingleton.getBookList()
            };
        case basketConstants.BASKET_BOOK_SORT:
            return {
                ...state,
                sortKey: action.sort.key,
                sortOrder: action.sort.order
            };
        case checkoutConstants.BUY_SUCCESS:
            booksInBasketSingleton.clear();
            return{
                booksInBasket: booksInBasketSingleton.getBookList(),
                sortKey: defaultSortKey,
                sortOrder: defaultSortOrder
            };
        default:
            return state
    }
}