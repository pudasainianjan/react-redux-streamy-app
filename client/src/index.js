import React from 'react';
import reactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import reduxThunk from 'redux-thunk';       //used for handling async api calls

import App from './components/App';
import reducers from './reducers';

const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;           //*for chrome debugging extension(redux-devtools-extension)
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))         //*for chrome debugging extension(redux-devtools-extension)
);



reactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
    ,
    document.querySelector('#root')
)

