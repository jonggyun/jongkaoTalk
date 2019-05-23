import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { userProfileRegister } from '../../modules/auth';
import { RootState } from '../../modules/index';
import UserProfile from '../../components/setting/UserProfile';
import endpoints from '../../lib/endpoints/auth';
import useInputs from '../../lib/hooks/useInputs';
import { getProfileImage } from '../../lib/firebase/user';

interface ProfileProps {
  uid: string;
  username: string;
  description: string;
}
interface IProps {
  userProfileRegister: ({ uid, username, description }: ProfileProps) => void;
  uid: string;
}
const UserProfileContainer: React.FC<IProps> = ({
  userProfileRegister,
  uid,
}) => {
  const [state, handleOnChange] = useInputs({
    username: '',
    description: '',
  });
  const [userProfileImage, setUserProfileImage] = useState('');
  const [changeImage, setChangeImage] = useState(null);
  const { username, description } = state;

  useEffect(() => {
    (async () => {
      try {
        const profileImage = await getProfileImage({ uid });
        setUserProfileImage(profileImage);
      } catch (err) {
        setUserProfileImage('');
      }
    })();
  }, [changeImage]);

  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    endpoints.userProfileImageRegister({ uid, file: e.currentTarget.files[0] });
    setChangeImage(e.currentTarget.files[0]);
  };

  const handleOnSubmit = () => {
    userProfileRegister({ uid, username, description });
  };

  return (
    <UserProfile
      username={username}
      userProfileImage={userProfileImage}
      description={description}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      handleUploadFile={handleUploadFile}
    />
  );
};

export default connect(
  (state: RootState, ownProps) => ({
    uid: state.auth.me.uid,
  }),
  {
    userProfileRegister,
  }
)(UserProfileContainer);
