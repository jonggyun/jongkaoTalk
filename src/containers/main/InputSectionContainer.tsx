import React, { useState, useEffect } from 'react';
import InputSection from '../../components/main/InputSection';

interface InputSectionContainer {}
const InputSectionContainer: React.FC<InputSectionContainer> = () => {
  const [type, typeState] = useState('login');
  const [username, usernameState] = useState('');
  const [nickname, nicknameState] = useState('');
  const [password, passwordState] = useState('');
  const [confirmPassword, confirmPasswordState] = useState('');
  const [comparePassword, comparePasswordState] = useState(false);

  const handleType = () => {
    type === 'login' ? typeState('signup') : typeState('login');
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === 'username'
      ? usernameState(value)
      : name === 'nickname'
      ? nicknameState(value)
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
    console.log(type, username, nickname, password);
  };

  useEffect(() => {
    usernameState('');
    nicknameState('');
    passwordState('');
    confirmPasswordState('');
  }, [type]);
  return (
    <InputSection
      type={type}
      handleType={handleType}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      username={username}
      nickname={nickname}
      password={password}
      confirmPassword={confirmPassword}
      comparePassword={comparePassword}
    />
  );
};

export default InputSectionContainer;
