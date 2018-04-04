export function sortList(list, sortKey, sortOrder) {
    return list.sort(compareValues(sortKey, sortOrder))
}

function compareValues(key, order = 'asc') {
    return function (a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            if ((!a.book || !a.book.hasOwnProperty(key)) || (!b.book || !b.book.hasOwnProperty(key)))
                return 0;
            return compareObject(a.book, b.book, key, order)
        }
        return compareObject(a, b, key, order)
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