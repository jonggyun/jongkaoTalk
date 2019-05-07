import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules/index';
import { userRegister, userLogin, userOauth } from '../../modules/auth';

import InputSection from '../../components/main/InputSection';

interface InputSectionContainerProps {
  type: string;
  userRegister: Function;
  userLogin: Function;
  userOauth: Function;
}
const InputSectionContainer: React.FC<
  RouteComponentProps<{}> & InputSectionContainerProps
> = ({ type, userRegister, userLogin, userOauth }) => {
  const [pageType, pageTypeState] = useState('login');
  const [email, emailState] = useState('');
  const [password, passwordState] = useState('');
  const [confirmPassword, confirmPasswordState] = useState('');
  const [comparePassword, comparePasswordState] = useState(false);

  const handleType = () => {
    pageType === 'login' ? pageTypeState('signup') : pageTypeState('login');
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === 'email'
      ? emailState(value)
      : name === 'password'
      ? passwordState(value)
      : confirmPasswordState(value);

    if (name === 'confirmPassword') {
      password === value
        ? comparePasswordState(true)
        : comparePasswordState(false);
    }
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

  useEffect(() => {
    emailState('');
    passwordState('');
    confirmPasswordState('');
  }, [pageType]);

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
      comparePassword={comparePassword}
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
