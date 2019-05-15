import React, { useState } from 'react';
import UserProfile from '../../components/setting/UserProfile';

import endpoints from '../../lib/endpoints/auth';

interface UserProfileContainerProps {}
const UserProfileContainer: React.FC<UserProfileContainerProps> = () => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === 'username' ? setUsername(value) : setDescription(value);
  };

  const handleOnSubmit = () => {
    console.log('submit', username, description);
    endpoints.userProfileRegister({ username, description });
  };

  return (
    <UserProfile
      username={username}
      description={description}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
    />
  );
};

export default UserProfileContainer;
