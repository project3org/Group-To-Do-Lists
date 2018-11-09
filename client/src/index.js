import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import redirect from './routes/emailConfirmation';
import store from './redux/store';

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={App} />
                <Route path='/account/confirmation/:token' component={redirect} />
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));
