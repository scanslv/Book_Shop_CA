export const BooksInBasketSingleton = (function () {
    // private variable
    let booksInBasketProxy;

    // private method
    function init() {
        const booksInBasketProxy = new BooksInBasket();

        return {
            addBook: function (book) {
                booksInBasketProxy.addBook(book);
            },
            removeBook: function (book) {
                booksInBasketProxy.removeBook(book);
            },
            getBasketCount: function () {
                return booksInBasketProxy.getBasketCount();
            },
            getBasketTotal: function () {
                return booksInBasketProxy.getBasketTotal();
            },
            getBooksInBasket: function () {
                return booksInBasketProxy.getBooksInBasket();
            },
            setBooksInBasket: function (books) {
                booksInBasketProxy.setBooksInBasket(books);
            },
            getBookList: function () {
                return booksInBasketProxy.getBookList();
            },
            clear: function () {
                booksInBasketProxy.clear();
            },
            accept: function (visitorObj) {
                booksInBasketProxy.accept(visitorObj);
            },
            getBasketDiscount: function () {
                return booksInBasketProxy.getBasketDiscount();
            }
        }
    }

    // public method
    return {
        getInstance: function () {
            if (!booksInBasketProxy) {
                booksInBasketProxy = init();
            }
            return booksInBasketProxy;
        }
    };

    function BooksInBasket() {
        // private variable
        const self = this;
        let booksInBasket = [];
        let count = 0;
        let total = 0;
        let discount = 0;

        this.getTotal = function () {
            return total;
        };
        this.getDiscount = function () {
            return discount;
        };
        this.setTotal = function (t) {
            total = t;
        };
        this.setDiscount = function (d) {
            discount = d;
        };

        // private methods
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
        const accept = function (visitor) {
            visitor.visit(self);
        };

        // public methods
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
                discount = 0;
            },
            accept: function (visitorObj) {
                accept(visitorObj);
            },
            getBasketDiscount: function () {
                return discount;
            }
        }
    }
})();