import { Action } from './farmReducer';
import { Farm, User, UserCredentialsInput } from './../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import userService from '../services/user';
import farmService from '../services/farm';

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
        ...state, user: action.payload
        
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: {...state.user, farms:[...state.user.farms, action.payload]}
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: { token: '', username: '', farms: [{farmname: ''}] },
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

const setCurrentUser = (currentUser: User) => {
  return {
    type: 'LOGIN_USER',
    payload: currentUser,
  };
};
const updateCurrentUserOwnFarms = (farmname: Pick<Farm, 'farmname'>) => {
  return {
    type: 'UPDATE_USER',
    payload: farmname,
  };
};

const loginUser = (
  { username, password }: UserCredentialsInput,
  onSuccess?: () => void
) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const user: User = await userService.login({ username, password });
      console.log('user', user)
      if (user) {
        dispatch(setCurrentUser(user));
        // persists user's token to local storage
        window.localStorage.setItem('currentUser', JSON.stringify(user));
        farmService.setToken(user); //sets Authorization header bearer token
        console.log('own', user);
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      if (error instanceof Error) console.log('login error', error.message);
    }
  };
};

//Authenticate user upon a successful registration
const setNewUser = (
  { username, password }: UserCredentialsInput,
  onSuccess?: () => void
) => {
  return async (
    dispatch: ThunkDispatch<UserState, void, AnyAction>
  ): Promise<void> => {
    try {
      const user = await userService.addUser({ username, password });
      if (user.username)
        dispatch(loginUser({ username: user.username, password }, onSuccess));
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
  updateCurrentUserOwnFarms,
};
