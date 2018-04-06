export function sortList(list, sortKey, sortOrder) {
    return list.sort(compareValues(sortKey, sortOrder))
}

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (a.hasOwnProperty(key) && b.hasOwnProperty(key))
            return compareObject(a, b, key, order);
        else if (key === 'comments' && a['comments'] && b['comments'])
            return compareObject(a['comments'], b['comments'], 'length', order);
        else if ((a.book && a.book.hasOwnProperty(key)) && (b.book && b.book.hasOwnProperty(key)))
            return compareObject(a.book, b.book, key, order);
        else if (key === 'quantity' && a.quantity && b.quantity)
            return compareObject(a.quantity, b.quantity, 'quantity', order);
        else if (key === 'total' && a.quantity && a.book && b.quantity && b.book)
            return compare(a.quantity * a.book.price, b.quantity * b.book.price, order);
        else if (key === 'rating' && a.comments && b.comments)
            return compare(totalRating(a.comments) / a.comments.length || 0, totalRating(b.comments) / b.comments.length || 0, order);
        return 0;

    }
}

function compareObject(a, b, key, order) {

    const varA = (typeof a[key] === 'string') ?
        a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ?
        b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
        comparison = 1;
    } else if (varA < varB) {
        comparison = -1;
    }
    return (
        (order == 'desc') ? (comparison * -1) : comparison
    );
}

function compare(a, b, order) {

    const varA = a;
    const varB = b;

    let comparison = 0;
    if (varA > varB) {
        comparison = 1;
    } else if (varA < varB) {
        comparison = -1;
    }
    return (
        (order == 'desc') ? (comparison * -1) : comparison
    );
}

function totalRating(comments){
    let totalRating = 0;

    comments.map((comment) => {
        totalRating = totalRating + parseInt(comment.rating);
    });

    return totalRating
}