import { FarmRecord, QueryParameters, FarmStatistics } from './../types';
import axios from 'axios';

const baseUrl = 'https://farmify-api.herokuapp.com';

const getFarmData = async (page = 1): Promise<FarmRecord[]> => {
  const res = await axios.get<FarmRecord[]>(
    `${baseUrl}/farms/data?limit=101&page=${page}`
  );
  return res.data;
};

const getFarmStatistics = async ({
  farmname,
  metrictype,
  year,
  limit,
}: QueryParameters): Promise<FarmStatistics[]> => {
  const res = await axios.get<FarmStatistics[]>(
    `${baseUrl}/farms/statistics?farmname=${farmname}&metrictype=${metrictype}&year=${year}&limit=${limit}`
  );
  return res.data;
};

export default { getFarmData, getFarmStatistics };
