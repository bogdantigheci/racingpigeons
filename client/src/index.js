import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import './style.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import Reducer from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import './i18n';
import { getExchangeRate } from './actions/exchangeRate';
import { getBreeders, getBreeds } from './actions/product';

const store = createStore(
  Reducer,
  composeWithDevTools(applyMiddleware(thunk, promiseMiddleware))
);

store.dispatch(getExchangeRate());
store.dispatch(getBreeders());
store.dispatch(getBreeds());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
