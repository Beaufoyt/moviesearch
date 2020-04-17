import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';

import App from './components/App';

import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/index.scss';

const store = configureStore();

const renderApp = () => render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app'),
);

if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./components/App', renderApp);
}

renderApp();
