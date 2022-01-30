import { notifyUser } from './notificationReducer';
import { Action } from './farmReducer';
import { Farm, User, UserCredentials, UserCredentialsInput } from './../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import userService from '../services/user';
import farmService from '../services/farm';
import { serverErrorHandler } from '../utils';

export type UserState = {
  user: User;
};

const initialUserState: UserState = {
  user: {
    token: '',
    username: '',
    farms: [],
  },
};

const userReducer = (state = initialUserState, action: Action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case 'SET_USER_FARMS':
      return {
        ...state,
        user: { ...state.user, farms: [...action.payload] },
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {
          ...state.user,
          farms: [...state.user.farms, { ...action.payload }],
        },
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: { token: '', username: '', farms: [{ farmname: '' }] },
      };
    default:
      return state;
  }
};

const logoutUser = () => {
  return async (dispatch: ThunkDispatch<UserState, void, AnyAction>) => {
    window.localStorage.removeItem('currentUser');
    dispatch({
      type: 'LOGOUT_USER',
    });
  };
};

const setCurrentUserCredentials = (payload: UserCredentials) => {
  return {
    type: 'LOGIN_USER',
    payload,
  };
};
const setCurrentUserOwnFarms = (token: string) => {
  return async (
    dispatch: ThunkDispatch<Pick<Farm, 'farmname'>[], void, AnyAction>
  ): Promise<void> => {
    try {
      const userOnwFarms = await userService.getUser(token);
      if (userOnwFarms && userOnwFarms.farms) {
        dispatch({
          type: 'SET_USER_FARMS',
          payload: [...userOnwFarms.farms],
        });
      }
      console.log(userOnwFarms);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
};
const updateCurrentUserOwnFarms = (farmname: Pick<Farm, 'farmname'>) => {
  return {
    type: 'UPDATE_USER',
    payload: farmname,
  };
};

const loginUser = ({ username, password }: UserCredentialsInput) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const user: UserCredentials = await userService.login({
        username,
        password,
      });

      if (user) {
        // persists user's token to local storage
        window.localStorage.setItem('currentUser', JSON.stringify(user));
        farmService.setToken(user); //sets Authorization header bearer token
        dispatch(setCurrentUserCredentials(user));
        dispatch(setCurrentUserOwnFarms(user.token));
        dispatch(
          notifyUser({ message: 'login', code: 'success', open: false })
        );
      }
    } catch (error) {
      serverErrorHandler(error, dispatch);
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
    } catch (error) {
      serverErrorHandler(error, dispatch);
    }
  };
};

export {
  userReducer as default,
  setNewUser,
  loginUser,
  logoutUser,
  setCurrentUserCredentials,
  setCurrentUserOwnFarms,
  updateCurrentUserOwnFarms,
};
