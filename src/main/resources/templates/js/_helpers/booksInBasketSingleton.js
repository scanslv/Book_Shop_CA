export const BooksInBasketSingleton = (function () {
    let booksInBasketProxy;

    function init() {
        let booksInBasket = [];
        let count = 0;
        let total = 0;

        const addBook = function (theBook) {
            let newState;
            let found = false;

            newState = booksInBasket.map((aBookInBasket) => {
                    if (aBookInBasket.book.id === theBook.id) {
                        found = true;
                        return {...aBookInBasket, quantity: (aBookInBasket.quantity) + 1};
                    } else
                        return aBookInBasket;
                }
            );

            if (!found) {
                newState = [...booksInBasket, createBook(theBook)]
            }
            return newState;
        };

        const removeBook = function (theBook) {
            let newState;
            let found;

            newState = booksInBasket.map((aBookInBasket) => {
                    if (aBookInBasket.book.id === theBook.id) {
                        if (aBookInBasket.quantity > 1)
                            return {...aBookInBasket, quantity: (aBookInBasket.quantity) - 1};
                        else {
                            found = aBookInBasket;
                            return aBookInBasket
                        }
                    } else
                        return aBookInBasket;

                }
            );
            if (found)
                return booksInBasket.filter(book => book !== found);
            else
                return newState
        };

        const createBook = function (theBook) {
            return {
                book: theBook,
                quantity: 1
            }
        };

        const getBooksToPurchase = function () {
            let booksToPurchase = [];

            booksInBasket.map((bookInBasket) => {
                for (let i = 0; i < bookInBasket.quantity; i++) {
                    booksToPurchase.push(bookInBasket.book);
                }
            });

            return booksToPurchase;
        };


        return {
            addBook: function (book) {
                count = count + 1;
                total = parseFloat(total) + parseFloat(book.price);
                booksInBasket = addBook(book);
            },
            removeBook: function (book) {
                count = count - 1;
                total = parseFloat(total) - parseFloat(book.price);
                booksInBasket = removeBook(book);
            },
            getBasketCount: function () {
                return count;
            },
            getBasketTotal: function () {
                return total;
            },
            getBooksInBasket: function () {
                return booksInBasket;
            },
            setBooksInBasket: function (books) {
                books.map((book) => {
                    this.addBook(book);
                })
            },
            getBookList: function () {
                return getBooksToPurchase();
            },
            clear: function () {
                booksInBasket = [];
                count = 0;
                total = 0;
            }
        }
    }

    return {
        getInstance: function () {
            if (!booksInBasketProxy) {
                booksInBasketProxy = init();
            }
            return booksInBasketProxy;
        }
    };
})();