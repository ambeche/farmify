import { UserCredentials } from './../types';
import {
  FarmRecord,
  QueryParameters,
  FarmStatistics,
  MetricType,
  Farm,
} from '../types';
import axios from 'axios';
import { BASE_URL } from '../utils';

let { farmname, metrictype, year }: QueryParameters = {};
const statsDefaultMetric = MetricType.Temperature;
const statsDefaultName = "Noora's farm";
const statsDefaultYear = 2019;

let token: string;

const setToken = (newToken: UserCredentials) =>
  (token = `bearer ${newToken.token}`);

const setQueryParams = ({
  farmname: name,
  metrictype: type,
  year: yr,
}: QueryParameters) => {
  farmname = name;
  if (type) metrictype = type;
  if (yr) year = yr;
};
const getFarms = async (): Promise<Farm[]> => {
  const res = await axios.get<Farm[]>(`${BASE_URL}/farms`);
  return res.data;
};

const createFarm = async (): Promise<FarmRecord[]> => {
  const res = await axios.post<FarmRecord[]>(`${BASE_URL}/farms`, {
    headers: { Authorization: token },
  });
  return res.data;
};

const getFarmData = async (page = 1): Promise<FarmRecord[]> => {
  const res = await axios.get<FarmRecord[]>(
    `${BASE_URL}/farms/data?limit=101&page=${page}&farmname=${farmname || ''}`
  );
  return res.data;
};

//statistics for a single farm
const getFarmStatisticsByName = async (): Promise<FarmStatistics[]> => {
  const res = await axios.get<FarmStatistics[]>(
    `${BASE_URL}/farms/statistics?farmname=${
      farmname || statsDefaultName
    }&metrictype=${metrictype || statsDefaultMetric}&year=${
      year || statsDefaultYear
    }&limit=12`
  );
  return res.data;
};

// fetch monthly aggregations from 4 different farms {12 months * 4 for 4 farms } in a given year
// next set of farms are fetched using the page parameter
const getFarmStatistics = async (page = 1): Promise<FarmStatistics[]> => {
  const res = await axios.get<FarmStatistics[]>(
    `${BASE_URL}/farms/statistics?&metrictype=${
      metrictype || statsDefaultMetric
    }&year=${year || statsDefaultYear}&limit=48&page=${page}`
  );
  return res.data;
};

export default {
  getFarmData,
  getFarmStatistics,
  getFarmStatisticsByName,
  getFarms,
  createFarm,
  setQueryParams,
  setToken,
};
