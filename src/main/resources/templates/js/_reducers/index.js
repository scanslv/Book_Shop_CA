import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {user} from './user.reducer';
import {book} from './book.reducer';
import {alert} from './alert.reducer';
import {allUsers} from './all.users.reducer';
import {basket} from './basket.reducer';
import {address} from './address.reducer';
import {card} from './card.reducer';
import {checkout} from './checkout.reducer';

const rootReducer = combineReducers({
    authentication,
    user,
    allUsers,
    book,
    alert,
    basket,
    address,
    card,
    checkout
});

export default rootReducer;