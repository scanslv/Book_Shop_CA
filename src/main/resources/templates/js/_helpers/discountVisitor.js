// export const DiscountVisitor = function () {
//     const addDiscount10 = function () {
//         this.visit = function (basket) {
//             basket.setTotal(basket.getTotal() + basket.getDiscount());
//             basket.setDiscount(0);
//             basket.setDiscount(basket.getTotal() * 0.1);
//             basket.setTotal(basket.getTotal() - basket.getDiscount());
//         };
//     };
//
//     const addDiscount20 = function () {
//         this.visit = function (basket) {
//             basket.total = basket.total + basket.discount;
//             basket.discount = 0;
//             basket.discount = basket.total * 0.2;
//             basket.total = basket.total - basket.discount
//         };
//     };
//
//     const removeDiscounts = function () {
//         this.visit = function (basket) {
//             basket.total = basket.total + basket.discount;
//             basket.discount = 0;
//         };
//     };
//     return {
//         addDiscount10: function () {
//             addDiscount10();
//         },
//         addDiscount20: function () {
//             addDiscount20();
//         },
//         removeDiscounts: function () {
//             removeDiscounts();
//         },
//     }
// };

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