import { MetricType, YearOptions } from './types';
import axios from 'axios';
import { Notification, notifyUser } from './reducers/notificationReducer';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const BASE_URL = 'https://farmify-api.herokuapp.com';
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const YEAR_OPTIONS = [
  { year: 2018, selected: false },
  { year: 2019, selected: true },
  { year: 2020, selected: false },
  { year: 2021, selected: false },
  { year: 2022, selected: false },
];

export const CHART_COLORS = {
  temperature: {
    max: '#FF871F',
    min: '#00C5CC',
    avg: '#00667e',
  },
  rainfall: {
    max: '#B4A0F8',
    min: '#FF9B70',
    avg: '#E47011',
  },
  ph: {
    max: '#1FA5FF',
    min: '#FF5C5C',
    avg: '#00667e',
  },
};

export const serverErrorHandler = (
  error: unknown,
  dispatch: ThunkDispatch<Notification, void, AnyAction>
) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      const statusCodes = [400, 401, 403];
      if (statusCodes.includes(error.response.status))
        return dispatch(
          notifyUser({
            message: error.response.data.error,
            code: 'error',
            open: false,
          })
        );
    }
  }
  if (error instanceof Error) console.log('internal Error', error.message);
};

export const getColorByMetric = (type: MetricType) => {
  if (type === MetricType.Temperature) return CHART_COLORS.temperature;
  if (type === MetricType.Rainfall) return CHART_COLORS.rainfall;
  return CHART_COLORS.ph;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isYearOption = (param: any): param is YearOptions => {
  return typeof param.year === 'number' && typeof param.selected === 'boolean';
};

export const assertNever = (arg: never): never => {
  throw new Error(`Unexpected value type: ${JSON.stringify(arg)}`);
};
