import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../modules/index';

import MyProfile from '../../components/chat/MyProfile';

import { getUserProfile } from '../../lib/firebase/user';
import { getUserInfo } from '../../modules/user';
import * as CommonActions from '../../modules/common';

interface IProps {
  loading: boolean;
  uid: string;
  username: string;
  userProfileImage: string;
  description: string;
  email: string;
  getUserInfo: (uid: string) => any;
  isShow: boolean;
  showModal: (isShow: boolean) => void;
}
const MyProfileContainer: React.FC<IProps> = ({
  loading,
  uid,
  username,
  userProfileImage,
  description,
  getUserInfo,
  email,
  isShow,
  showModal,
}) => {
  const handleOnClick = () => {
    showModal(!isShow);
  };

  useEffect(() => {
    getUserProfile(uid);
    getUserInfo(uid);
  }, [getUserInfo, uid]);

  return (
    <MyProfile
      loading={loading}
      username={username}
      userProfileImage={userProfileImage}
      description={description}
      email={email}
      handleOnClick={handleOnClick}
      isShow={isShow}
    />
  );
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
  return {
    getUserInfo: (uid: string) => dispatch(getUserInfo(uid)),
    showModal: (isShow: boolean) =>
      dispatch(CommonActions.showModal({ isShow })),
  };
};

export default connect(
  (state: RootState, ownProps) => ({
    uid: state.auth.me.uid,
    loading: state.user.loading,
    username: state.user.myProfile.username,
    userProfileImage: state.user.myProfile.userProfileImage,
    description: state.user.myProfile.description,
    email: state.user.myProfile.email,
    isShow: state.common.isShow,
  }),
  mapDispatchToProps
)(MyProfileContainer);
