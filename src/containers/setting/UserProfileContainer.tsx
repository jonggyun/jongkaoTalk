import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

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
  history: any;
}
const UserProfileContainer: React.FC<RouteComponentProps<{}> & IProps> = ({
  userProfileRegister,
  uid,
  history,
}) => {
  const [state, handleOnChange] = useInputs({
    username: '',
    description: '',
  });
  const [userProfileImage, setUserProfileImage] = useState('');
  const [changeImage, setChangeImage] = useState(false);
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

  const handleUploadFile = async (e: React.FormEvent<HTMLInputElement>) => {
    await endpoints.userProfileImageRegister({
      uid,
      file: e.currentTarget.files[0],
    });
    setChangeImage(!changeImage);
  };

  const handleOnSubmit = async () => {
    try {
      await userProfileRegister({ uid, username, description });
      // history.push('/chattingrooms');
    } catch (err) {
      console.log('profile submit', err);
    }
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

export default withRouter(
  connect(
    (state: RootState, ownProps) => ({
      uid: state.auth.me.uid,
    }),
    {
      userProfileRegister,
    }
  )(UserProfileContainer)
);
