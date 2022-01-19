import { FarmRecord } from './../types';
import axios from 'axios';

const baseUrl = 'https://farmify-api.herokuapp.com';

//let token;

//const setToken = (newToken) => (token = `bearer ${newToken}`);

const getFarmData = async (page = 1): Promise<FarmRecord[]> => {
  const res = await axios.get<FarmRecord[]>(`${baseUrl}/farms/data?limit=100&page=${page}`);
  return res.data;
};

export default {getFarmData,}
