import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../modules/index';

import MyProfile from '../../components/chat/MyProfile';

import { getUserProfile } from '../../lib/firebase/user';
import { getUserInfo } from '../../modules/user';

interface IProps {
  loading: boolean;
  uid: string;
  username: string;
  userProfileImage: string;
  description: string;
  getUserInfo: (uid: string) => any;
}
const MyProfileContainer: React.FC<IProps> = ({
  loading,
  uid,
  username,
  userProfileImage,
  description,
  getUserInfo,
}) => {
  useEffect(() => {
    getUserProfile(uid);
    getUserInfo(uid);
  }, []);

  return (
    <MyProfile
      loading={loading}
      username={username}
      userProfileImage={userProfileImage}
      description={description}
    />
  );
};

export default connect(
  (state: RootState, ownProps) => ({
    uid: state.auth.me.uid,
    loading: state.user.loading,
    username: state.user.myProfile.username,
    userProfileImage: state.user.myProfile.userProfileImage,
    description: state.user.myProfile.description,
  }),
  {
    getUserInfo,
  }
)(MyProfileContainer);
