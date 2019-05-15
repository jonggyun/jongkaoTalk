import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userProfileRegister } from '../../modules/auth';
import UserProfile from '../../components/setting/UserProfile';

interface ProfileProps {
  username: string;
  description: string;
}
interface UserProfileContainerProps {
  userProfileRegister: ({ username, description }: ProfileProps) => void;
}
const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  userProfileRegister,
}) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === 'username' ? setUsername(value) : setDescription(value);
  };

  const handleOnSubmit = () => {
    userProfileRegister({ username, description });
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

export default connect(
  null,
  {
    userProfileRegister,
  }
)(UserProfileContainer);
