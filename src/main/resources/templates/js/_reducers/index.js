import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {user} from './user.reducer';
import {book} from './book.reducer';
import {alert} from './alert.reducer';
import {allUsers} from './all.users.reducer';

const rootReducer = combineReducers({
    authentication,
    user,
    allUsers,
    book,
    alert,
});

export default rootReducer;