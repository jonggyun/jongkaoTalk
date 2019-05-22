import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../modules/index';
import { userRegister, userLogin, userOauth } from '../../modules/auth';

import InputSection from '../../components/main/InputSection';

import useInputs from '../../lib/hooks/useInputs';

interface RegisterProps {
  email: string;
  password: string;
}
interface IProps {
  type: string;
  userRegister: ({ email, password }: RegisterProps) => void;
  userLogin: ({ email, password }: RegisterProps) => void;
  userOauth: () => void;
}
const InputSectionContainer: React.FC<RouteComponentProps<{}> & IProps> = ({
  type,
  userRegister,
  userLogin,
  userOauth,
}) => {
  const [pageType, setPageType] = useState('login');
  const [state, handleOnChange] = useInputs({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { email, password, confirmPassword } = state;

  const handleType = () => {
    pageType === 'login' ? setPageType('signup') : setPageType('login');
  };

  const handleOnSubmit = () => {
    pageType === 'login'
      ? userLogin({ email, password })
      : userRegister({ email, password });
  };

  const handleGoogleLogin = () => {
    console.log('hadleGoogleLogin');
    userOauth();
  };

  return (
    <InputSection
      type={type}
      pageType={pageType}
      handleType={handleType}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      handleGoogleLogin={handleGoogleLogin}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
    />
  );
};

export default withRouter(
  connect(
    (state: RootState, ownProps) => ({
      type: state.auth.type,
    }),
    {
      userRegister,
      userLogin,
      userOauth,
    }
  )(InputSectionContainer)
);
