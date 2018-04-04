import {basketConstants} from '../_constants';

const initialState = {
    booksInBasket: []
};

export function basket(state = initialState, action) {
    switch (action.type) {
        case basketConstants.ADD_BOOK_SUCCESS:
            return {
                booksInBasket: addBook(state, action.book)
            };
        case basketConstants.REMOVE_BOOK_SUCCESS:
            return {
                booksInBasket: state.booksInBasket.filter(obj => obj.book !== action.book)
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

function removeBook(state, theBook) {
    return state.booksInBasket.filter(obj => obj.book !== theBook);
}