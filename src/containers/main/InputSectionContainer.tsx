import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { RootState } from '../../modules/index';
import { userRegister, userLogin, userOauth } from '../../modules/auth';

import InputSection from '../../components/main/InputSection';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [comparePassword, setComparePassword] = useState(false);

  const handleType = () => {
    pageType === 'login' ? setPageType('signup') : setPageType('login');
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === 'email'
      ? setEmail(value)
      : name === 'password'
      ? setPassword(value)
      : setConfirmPassword(value);

    if (name === 'confirmPassword') {
      password === value ? setComparePassword(true) : setComparePassword(false);
    }
  };

  const handleOnSubmit = () => {
    pageType === 'login' ? userLogin({ email, password }) : userRegister({ email, password });
  };

  const handleGoogleLogin = () => {
    console.log('hadleGoogleLogin');
    userOauth();
  };

  useEffect(() => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
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
