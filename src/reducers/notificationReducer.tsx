import {AlertColor} from '@mui/material';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from './farmReducer';

export type Notification = {
  message: string;
  code?: AlertColor;
  open: boolean;
};
const initialState: Notification = {
  message: '',
  code: 'success',
  open: false,
};

const notificationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_NOTICE':
      return action.payload;
    case 'RESET_NOTICE':
      return { ...initialState };
    default:
      return state;
  }
};

export const notifyUser = (notice: Notification) => {
  return async (
    dispatch: ThunkDispatch<Notification, void, AnyAction>
  ): Promise<void> => {
    dispatch({
      type: 'SET_NOTICE',
      payload: notice,
    });
    await new Promise(() => {
      setTimeout(() => {
        dispatch({
          type: 'RESET_NOTICE',
        });
      }, 6000);
    });
  };
};
export default notificationReducer;
