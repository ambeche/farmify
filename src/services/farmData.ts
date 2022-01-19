import { FarmRecord } from './../types';
import axios from 'axios';

const baseUrl = 'https://farmify-api.herokuapp.com';


let page = 1;
const setPage = (newPage: number) => page = newPage;

//let token;

//const setToken = (newToken) => (token = `bearer ${newToken}`);

const getFarmData = async (): Promise<FarmRecord[]> => {
  const res = await axios.get<FarmRecord[]>(`${baseUrl}/farms/data?limit=500&page=${page}`);
  return res.data;
};

export default {getFarmData, setPage}
