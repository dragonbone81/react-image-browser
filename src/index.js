import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'mobx-react'
import AuthStore from './stores/AuthStore'

ReactDOM.render(
    <Provider authStore={AuthStore}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));
