import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from './farmReducer';

export type Notification = {
  message: string;
  code: string;
};
const initialState: Notification = {
  message: '',
  code: '',
};

const notificationReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_NOTICE':
      return { ...state, ...action.payload };
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
      }, 5000);
    });
  };
};

export default notificationReducer;
