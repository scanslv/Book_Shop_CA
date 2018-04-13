export const Shipping = function() {
    this.method = "";
};

Shipping.prototype = {
    setStrategy: function(company) {
        this.method = company;
    },

    calculate: function(bookCount) {
        return this.method.calculate(bookCount);
    }
};

export const AnPost = function() {
    this.calculate = function(bookCount) {
        return bookCount * 1.95;
    }
};

export const Free = function() {
    this.calculate = function(bookCount) {
        return 0;
    }
};

export const Courier = function() {
    this.calculate = function(bookCount) {
        return bookCount * 2.95;
    }
};
