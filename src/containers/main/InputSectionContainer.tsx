import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../modules/index';
import { userRegister, userLogin } from '../../modules/auth';

import endpoints from '../../lib/endpoints/auth';

import InputSection from '../../components/main/InputSection';

interface InputSectionContainer {
  type: string;
  userRegister: Function;
  userLogin: Function;
}
const InputSectionContainer: React.FC<InputSectionContainer> = ({
  type,
  userRegister,
  userLogin,
}) => {
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
    endpoints.googleLogin();
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

export default connect(
  (state: RootState, ownProps) => ({
    type: state.auth.type,
  }),
  {
    userRegister,
    userLogin,
  }
)(InputSectionContainer);
