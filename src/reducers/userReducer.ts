import { Action } from './farmReducer';
import { UserCredentials, UserCredentialsInput } from './../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import userService from '../services/user';
import farmService from '../services/farm';

export type UserState = {
  user: UserCredentials;
};

const initialUserState: UserState = {
  user: {
    token: '',
    username: '',
  },
};

const userReducer = (state = initialUserState, action: Action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT_USER':
      return { ...state, user: { token: '', username: '' } };
    default:
      return state;
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

const setCurrentUser = (currentUser: UserCredentials) => {
  return {
    type: 'LOGOUT_USER',
    payload: currentUser,
  };
};

const loginUser = ({ username, password }: UserCredentialsInput) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const currentUser = await userService.login({ username, password });
      if (currentUser) {
        // persists user's token to local storage
        window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
        farmService.setToken(currentUser); //sets Authorization header bearer token
        dispatch(setCurrentUser(currentUser));
      }
    } catch (error) {
      if (error instanceof Error) console.log('login error', error.message);
    }
  };
};

//Authenticate user upon a successful registration
const setNewUser = ({ username, password }: UserCredentialsInput) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const user = await userService.addUser({ username, password });
      if (user.username)
        dispatch(loginUser({ username: user.username, password }));
      console.log('new user', user);
    } catch (error) {
      if (error instanceof Error)
        console.log('farmdataDispatchError', error.message);
    }
  };
};

export {
  userReducer as default,
  setNewUser,
  loginUser,
  logoutUser,
  setCurrentUser,
};
