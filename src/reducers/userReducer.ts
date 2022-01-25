import { Action } from './farmReducer';
import { UserCredentials, UserCredentialsInput } from './../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import userService from '../services/user';

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
      return { ...state, user: {token: '', username: ''} };
    default:
      return state;
  }
};

const logoutUser = () => {
  return {
    type: 'LOGOUT_USER',
  };
};

const loginUser = ({ username, password }: UserCredentialsInput) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const user = await userService.login({ username, password });
      if (user) {
        dispatch({
          type: 'LOGIN_USER',
          payload: user,
        });
      }
    } catch (error) {
      if (error instanceof Error) console.log('login error', error.message);
    }
  };
};

const setNewUser = ({ username, password }: UserCredentialsInput) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const user = await userService.addUser({ username, password });
      if (user.username)
        dispatch(loginUser({ username: user.username, password }));
        console.log('new user', user)
    } catch (error) {
      if (error instanceof Error)
        console.log('farmdataDispatchError', error.message);
    }
  };
};

export { userReducer as default, setNewUser, loginUser, logoutUser };
