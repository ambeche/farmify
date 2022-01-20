import { FarmRecord } from './../types';
import axios from 'axios';

const baseUrl = 'https://farmify-api.herokuapp.com';

const getFarmData = async (page = 1): Promise<FarmRecord[]> => {
  const res = await axios.get<FarmRecord[]>(`${baseUrl}/farms/data?limit=101&page=${page}`);
  return res.data;
};

export default {getFarmData,}
