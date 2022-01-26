import axios from 'axios';
import {
  UserCredentialsBase,
  UserCredentials,
  UserCredentialsInput,
} from '../types';
import { BASE_URL } from '../utils';

const addUser = async (
  credentials: UserCredentialsInput
): Promise<UserCredentialsBase> => {
  const res = await axios.post<UserCredentialsBase>(
    `${BASE_URL}/users`,
    credentials
  );
  return res.data;
};

const login = async (
  credentials: UserCredentialsInput
): Promise<UserCredentials> => {
  const res = await axios.post<UserCredentials>(
    `${BASE_URL}/login`,
    credentials
  );
  return res.data;
};

export default {addUser, login}
