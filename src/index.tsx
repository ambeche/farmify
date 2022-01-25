import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import { farmReducer } from './reducers/farmReducer';
import userReducer from './reducers/userReducer';

const reducers = combineReducers({
  farm: farmReducer,
  user: userReducer,
});
export type RootState = ReturnType<typeof reducers>;
const store = createStore(reducers, applyMiddleware(thunk));
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,

  document.getElementById('root')
);
