export const CanPurchase = function () {
};
export const HasCard = function () {
};
export const HasAddress = function () {
};
export const ValidCard = function () {
};
export const ValidQuantity = function () {
};
export const HasQuantity = function () {
};

CanPurchase.prototype = {
    canPurchase: function (user, booksInBasket) {
        const hasAddress = new HasAddress().hasAddress(user);
        const hasCard = new HasCard().hasCard(user);
        const validQuantity = new ValidQuantity().isValid(booksInBasket);

        return !!(hasAddress && hasCard && validQuantity);
    }
};

HasAddress.prototype = {
    hasAddress: function (user) {
        return !!user.address;
    }
};

HasCard.prototype = {
    hasCard: function (user) {
        if (user.card)
            return new ValidCard().isValid(user.card);
        else
            return false;
    }
};

ValidCard.prototype = {
    isValid: function (card) {
        return true;
    }
};

ValidQuantity.prototype = {
    isValid: function (booksInBasket) {
        if (new HasQuantity().hasQuantity(booksInBasket))
            return canOrder(booksInBasket);
        else
            return false;
    }
};

HasQuantity.prototype = {
    hasQuantity: function (booksInBasket) {
        return booksInBasket.length > 0;
    }
};


function canOrder(booksInBasket) {
    let canOrder = true;
    booksInBasket.map((bookInBasket) => {
        if (bookInBasket.book.available < bookInBasket.quantity)
            canOrder = false;
    });
    return canOrder;
}