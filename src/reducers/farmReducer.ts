import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import farmData from '../services/farmData';
import { FarmRecord, FarmStatistics } from './../types';

export interface Page {
  index: number;
  farmData: FarmRecord[];
}
export type Action =
  | {
      type: 'SET_FARM_DATA';
      payload: Page;
    }
  | {
      type: 'SET_PAGE';
      payload: number;
    }
  | {
      type: 'SET_SINGLE_FARM_STATISTICS';
      payload: FarmStatistics[];
    }
  | {
      type: 'SET_COMBINED_FARMS_STATISTICS';
      payload: FarmStatistics[];
    };

export type RootState = {
  farmData: FarmRecord[];
  pages: Page[];
  nextPage: number;
  currentPage: number;
  farmStats: {
    singleFarm: FarmStatistics[];
    combinedFarms: FarmStatistics[];
  };
};

const initialState: RootState = {
  farmData: [],
  pages: [],
  nextPage: 0,
  currentPage: 0,
  farmStats: {
    singleFarm: [],
    combinedFarms: [],
  },
};

export const farmReducer = (
  state = initialState,
  action: Action
): RootState => {
  switch (action.type) {
    case 'SET_FARM_DATA':
      return {
        ...state,
        farmData: [...state.farmData, ...action.payload.farmData],
        pages: [...state.pages, action.payload],
      };
    case 'SET_PAGE':
      // controlls when next subset of data is fetched, if it already exits the state object, it is obtained from there.
      if (!state.pages.find((page) => page.index === action.payload)) {
        return {
          ...state,
          nextPage: state.nextPage + 1,
          currentPage: action.payload,
        };
      }
      return { ...state, currentPage: action.payload };
    case 'SET_SINGLE_FARM_STATISTICS':
      return {
        ...state,
        farmStats: { ...state.farmStats, singleFarm: [...action.payload] },
      };
    case 'SET_COMBINED_FARMS_STATISTICS':
      return {
        ...state,
        farmStats: { ...state.farmStats, combinedFarms: [...action.payload] },
      };
    default:
      return state;
  }
};

const setPage = (index: number) => {
  return {
    type: 'SET_PAGE',
    payload: index,
  };
};

const setFarmData = (page = 1) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, AnyAction>
  ): Promise<void> => {
    try {
      const farmRecords = await farmData.getFarmData(page);
      const payload = { index: page, farmData: farmRecords };

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

const setFarmStatistics = (isCombined: boolean, page?: number) => {
  return async (
    dispatch: ThunkDispatch<RootState, void, AnyAction>
  ): Promise<void> => {
    try {
      if (isCombined) {
        const payload = await farmData.getFarmStatistics(page);
        dispatch({
          type: 'SET_COMBINED_FARMS_STATISTICS',
          payload,
        });
        console.log('combined', payload);
        return;
      }
      const payload = await farmData.getFarmStatisticsByName();
      dispatch({
        type: 'SET_SINGLE_FARM_STATISTICS',
        payload,
      });
      console.log('single', payload);
    } catch (error) {
      if (error instanceof Error)
        console.log('StatsDispatchError', error.message);
    }
  };
};

export { setFarmData, setPage, setFarmStatistics };
