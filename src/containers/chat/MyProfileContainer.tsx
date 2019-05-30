import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../modules/index';

import MyProfile from '../../components/chat/MyProfile';

import { getUserProfile } from '../../lib/firebase/user';

interface IProps {
  uid: string;
}
const MyProfileContainer: React.FC<IProps> = ({ uid }) => {
  useEffect(() => {
    console.log('uid!!!', uid);
  }, [uid]);
  return <MyProfile />;
};

export default connect((state: RootState, ownProps) => ({
  uid: state.auth.me.uid,
}))(MyProfileContainer);
