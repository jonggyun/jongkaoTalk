import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { userRegister } from '../../modules/auth';

import InputSection from '../../components/main/InputSection';

interface InputSectionContainer {
  userRegister: Function;
}
const InputSectionContainer: React.FC<InputSectionContainer> = ({
  userRegister,
}) => {
  const [type, typeState] = useState('login');
  const [email, emailState] = useState('');
  const [password, passwordState] = useState('');
  const [confirmPassword, confirmPasswordState] = useState('');
  const [comparePassword, comparePasswordState] = useState(false);

  const handleType = () => {
    type === 'login' ? typeState('signup') : typeState('login');
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
    console.log(type, email, password);
    type === 'login' ? console.log('login') : userRegister({ email, password });
  };

  useEffect(() => {
    emailState('');
    passwordState('');
    confirmPasswordState('');
  }, [type]);
  return (
    <InputSection
      type={type}
      handleType={handleType}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      comparePassword={comparePassword}
    />
  );
};

export default connect(
  null,
  {
    userRegister,
  }
)(InputSectionContainer);
