import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {store, persistor} from './js/_helpers';
import {App} from './js/App';

render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>,
    document.getElementById('app')
);