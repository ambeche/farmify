import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import farmData from '../services/farmData';
import { FarmRecord } from './../types';

interface Page {
  index: number;
  size: number;
}
export type Action =
  | {
      type: 'SET_FARM_DATA';
      payload: FarmRecord[];
    }
  | {
      type: 'SET_PAGE';
      page: Page['index'];
    }
  | {
      type: 'SET_PAGE_SIZE';
      pageSize: Page['size'];
    };

export type RootState = {
  farmData: FarmRecord[];
  page: Page;
};

const initialState: RootState = {
  farmData: [],
  page: {
    index: 1,
    size: 100,
  },
};

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const farmReducer = (
  state = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case 'SET_FARM_DATA':
      return {
        ...state,
        farmData: [...state.farmData, ...action.payload],
      };
    case 'SET_PAGE':
      return {
        ...state, page:{...state.page, index: state.page.index+1}
      };
    default:
      return state;
  }
};


const setPage = (index: number) => {
  return {
    type: 'SET_PAGE',
    page:index,
  }
}


const setFarmData = (page =1 ) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, AnyAction>
  ): Promise<void> => {
    try {
      const payload = await farmData.getFarmData(page);
      dispatch({
        type: 'SET_FARM_DATA',
        payload,
      });
    } catch (error) {
      if (error instanceof Error)
        console.log('farmdataDispatchError', error.message);
    }
  };
};

export { setFarmData, setPage };
