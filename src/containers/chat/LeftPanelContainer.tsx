import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

import LeftPanel from '../../components/chat/LeftPanel';
import { userAuthSignOut } from '../../lib/firebase/auth';

import * as authActions from '../../modules/auth';

interface IProps {
  userLogout: () => void;
}
const LeftPanelContainer: React.FC<IProps> = ({ userLogout }) => {
  const [leftType, setLeftType] = useState('friend');

  const handleLeftType = (e: React.MouseEvent<HTMLElement>) => {
    const { type } = e.currentTarget.dataset;
    type === 'friend' ? setLeftType('friend') : setLeftType('message');
  };

  const handleLogout = () => {
    Modal.confirm({
      title: 'Do you Want to Logout?',
      content: 'If you want to logout. please click OK.',
      async onOk() {
        await userAuthSignOut();
        userLogout();
      },
      onCancel() {},
    });
  };
  return (
    <LeftPanel
      handleLeftType={handleLeftType}
      handleLogout={handleLogout}
      type={leftType}
    />
  );
};

export default connect(
  null,
  (dispatch, ownProps) => {
    return {
      userLogout: () =>
        dispatch(
          authActions.userLogout({
            type: 'logout',
            loading: false,
            isLoggedIn: false,
          })
        ),
    };
  }
)(LeftPanelContainer);
