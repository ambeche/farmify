import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { farmReducer } from './reducers/farmReducer';

const store = createStore(farmReducer, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);
