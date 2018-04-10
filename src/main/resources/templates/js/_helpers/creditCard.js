export const CreditCard = function () {

};

CreditCard.prototype.validate = function () {
    if (!checkExpiryDateValid())
        return {check: 'expDate'};
    if (!checkAllCharsDigits())
        return {check: 'chars'};
    if (!(checkNumberOfDigits))
        return {check: 'digits'};
    if (!checkValidPrefix())
        return {check: 'prefix'};
    if (!checkCheckSumDigit())
        return {check: 'digitSum'};


    const checkExpiryDateValid = function () {

    };
};