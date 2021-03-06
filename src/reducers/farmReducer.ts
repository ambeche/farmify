import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import farmService from '../services/farm';
import {
  FarmRecord,
  FarmStatistics,
  FarmOptions,
  Farm,
  UserCredentials,
} from './../types';
import { updateCurrentUserOwnFarms } from './userReducer';
import { Notification, notifyUser } from './notificationReducer';
import { serverErrorHandler } from '../utils';

export interface Page {
  index: number;
  farmData: FarmRecord[];
}
export type Action =
  | {
      type: 'SET_FARM_OPTIONS';
      payload: FarmOptions[];
    }
  | {
      type: 'UPDATE_FARM_OPTIONS';
      payload: FarmOptions;
    }
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
    }
  | {
      type: 'RESET_FARM_DATA';
    }
  | {
      type: 'LOGIN_USER';
      payload: UserCredentials;
    }
  | {
      type: 'LOGOUT_USER';
    }
  | {
      type: 'UPDATE_USER';
      payload: Pick<Farm, 'farmname'>;
    }
  | {
      type: 'SET_USER_FARMS';
      payload: Pick<Farm, 'farmname'>[];
    }
  | {
      type: 'SET_NOTICE';
      payload: Notification;
    }
  | {
      type: 'RESET_NOTICE';
    }
  | {
      type: 'SET_FARM_MENU';
      payload: boolean;
    };

export type FarmState = {
  farmData: FarmRecord[];
  pages: Page[];
  nextPage: number;
  currentPage: number;
  farmStats: {
    singleFarm: FarmStatistics[];
    combinedFarms: FarmStatistics[];
  };
  farmOptions: FarmOptions[];
  isFarmMenuOPened: boolean;
};

const initialState: FarmState = {
  farmData: [],
  pages: [],
  nextPage: 0,
  currentPage: 0,
  farmStats: {
    singleFarm: [],
    combinedFarms: [],
  },
  farmOptions: [],
  isFarmMenuOPened: false,
};

export const farmReducer = (
  state = initialState,
  action: Action
): FarmState => {
  switch (action.type) {
    case 'SET_FARM_DATA':
      return {
        ...state,
        farmData: [...state.farmData, ...action.payload.farmData],
        pages: [...state.pages, action.payload],
      };
    case 'RESET_FARM_DATA':
      return {
        ...state,
        farmData: [],
        pages: [],
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
    case 'SET_FARM_OPTIONS':
      return {
        ...state,
        farmOptions: [...state.farmOptions, ...action.payload],
      };
    case 'UPDATE_FARM_OPTIONS':
      return {
        ...state,
        farmOptions: state.farmOptions.map((option) =>
          option.farmname === action.payload.farmname
            ? action.payload
            : { ...option, selected: false }
        ),
      };
    case 'SET_FARM_MENU':
      return {
        ...state,
        isFarmMenuOPened: action.payload,
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
const updateFarmOptions = (option: FarmOptions) => {
  return {
    type: 'UPDATE_FARM_OPTIONS',
    payload: option,
  };
};
const addFarmOption = (option: FarmOptions[]) => {
  return {
    type: 'SET_FARM_OPTIONS',
    payload: option,
  };
};
const resetFarmData = () => {
  return {
    type: 'RESET_FARM_DATA',
  };
};
// launches the farm menu from any component
const toggleFarmMenu = (payload: boolean) => {
  return {
    type: 'SET_FARM_MENU',
    payload,
  };
};

const setFarmOptions = () => {
  return async (
    dispatch: ThunkDispatch<FarmState, void, AnyAction>
  ): Promise<void> => {
    try {
      const farms = await farmService.getFarms();
      const options: FarmOptions[] = farms.map((farm) => ({
        farmname: farm.farmname,
        owner: farm.owner,
        selected: false,
      }));
      // defined menu options for selecting farms
      const payload = [
        {
          farmname: 'All Farms',
          owner: '',
          selected: true,
        },
        ...options,
      ];
      dispatch(addFarmOption(payload));
    } catch (error) {
      if (error instanceof Error)
        console.log('farmDispatchError', error.message);
    }
  };
};

const setFarmData = (page = 1) => {
  return async (
    dispatch: ThunkDispatch<FarmState, void, AnyAction>
  ): Promise<void> => {
    try {
      const farmRecords = await farmService.getFarmData(page);
      const payload = { index: page, farmData: farmRecords };
      dispatch({
        type: 'SET_FARM_DATA',
        payload,
      });
    } catch (error) {
      serverErrorHandler(error, dispatch);
    }
  };
};

const setFarmStatistics = (isCombined: boolean, page?: number) => {
  return async (
    dispatch: ThunkDispatch<FarmState, void, AnyAction>
  ): Promise<void> => {
    try {
      if (isCombined) {
        const payload = await farmService.getFarmStatistics(page);
        dispatch({
          type: 'SET_COMBINED_FARMS_STATISTICS',
          payload,
        });
        return;
      }
      const payload = await farmService.getFarmStatisticsByName();
      dispatch({
        type: 'SET_SINGLE_FARM_STATISTICS',
        payload,
      });
    } catch (error) {
      serverErrorHandler(error, dispatch);
    }
  };
};

// adds data to a new farm and updates farm options
// for filtering on the data grid interface
const addFarm = (file: File, owner: string) => {
  return async (
    dispatch: ThunkDispatch<FarmState, void, AnyAction>
  ): Promise<void> => {
    try {
      const addedFarmRecords = await farmService.createFarm(file);
      const payload = {
        farmname: addedFarmRecords[0].farmname,
        owner,
        selected: false,
      };
      const message = `Farm '${addedFarmRecords[0].farmname}
      ' was successfully created with ${addedFarmRecords.length} records. Some records may have been discarded if they were invalid`;
      dispatch(addFarmOption([payload]));
      dispatch(
        updateCurrentUserOwnFarms({ farmname: addedFarmRecords[0].farmname })
      );
      dispatch(notifyUser({ message, code: 'success', open: true }));
    } catch (error) {
      serverErrorHandler(error, dispatch);
    }
  };
};

const addDataToExistingFarm = (file: File) => {
  return async (
    dispatch: ThunkDispatch<FarmState, void, AnyAction>
  ): Promise<void> => {
    try {
      const addedRecords = await farmService.updateFarmWithData(file);
      const message = `${addedRecords.length} 
      Records Successfully added to farm '${addedRecords[0].farmname}'`;

      dispatch(notifyUser({ message, code: 'success', open: true }));
    } catch (error) {
      serverErrorHandler(error, dispatch);
    }
  };
};

export {
  setFarmData,
  setPage,
  setFarmStatistics,
  addFarm,
  setFarmOptions,
  updateFarmOptions,
  resetFarmData,
  addDataToExistingFarm,
  toggleFarmMenu,
};
