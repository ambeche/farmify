import React from 'react';
import { loginUser, setNewUser } from '../reducers/userReducer';
import { UserCredentialsInput } from '../types';
import RegisterOrLogin from '../User/RegisterOrLogin';
import { RootState, useAppDispatch } from '..';
import { Action } from '../reducers/farmReducer';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

interface LoginProps {
  submissionType: 'login';
}

interface RegisterProps {
  submissionType: 'register';
}

type AuthenticationProps = LoginProps | RegisterProps;

const Authentication = ({ submissionType }: AuthenticationProps) => {
  const dispatch = useAppDispatch();
  const {token} = useSelector((state: RootState) => state.user.user)
  const navigate = useNavigate();

  const onSuccess = () => {
    navigate('/', { replace: true });
  }
  const handleUserRegistration = (credentials: UserCredentialsInput) => {
    dispatch(setNewUser(credentials,  onSuccess) as unknown as Action);
  };
  const handleUserLogin = (credentials: UserCredentialsInput) => {
    dispatch(loginUser(credentials, onSuccess) as unknown as Action);
  };

  switch (submissionType) {
    case 'login':
      return (
        <RegisterOrLogin
          redirectBtnLabel="register"
          submissionType="login"
          handleSubmission={handleUserLogin}
        />
      );
    case 'register':
      return (
        <RegisterOrLogin
          redirectBtnLabel="login"
          submissionType="register"
          handleSubmission={handleUserRegistration}
        />
      );
  }
};

export default Authentication;
