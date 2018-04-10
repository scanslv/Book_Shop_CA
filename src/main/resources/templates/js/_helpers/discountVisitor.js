export const addDiscount10 = function () {
    this.visit = function (basket) {
        basket.setTotal(basket.getTotal() + basket.getDiscount());
        basket.setDiscount(0);
        basket.setDiscount(basket.getTotal() * 0.1);
        basket.setTotal(basket.getTotal() - basket.getDiscount());
    };
};

export const addDiscount20 = function () {
    this.visit = function (basket) {
        basket.setTotal(basket.getTotal() + basket.getDiscount());
        basket.setDiscount(0);
        basket.setDiscount(basket.getTotal() * 0.2);
        basket.setTotal(basket.getTotal() - basket.getDiscount());
    };
};

export const removeDiscounts = function () {
    this.visit = function (basket) {
        basket.setTotal(basket.getTotal() + basket.getDiscount());
        basket.setDiscount(0);
    };
};
