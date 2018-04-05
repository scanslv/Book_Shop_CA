import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {user} from './user.reducer';
import {book} from './book.reducer';
import {alert} from './alert.reducer';
import {allUsers} from './all.users.reducer';
import {basket} from './basket.reducer';
import {address} from './address.reducer';

const rootReducer = combineReducers({
    authentication,
    user,
    allUsers,
    book,
    alert,
    basket,
    address
});

export default rootReducer;