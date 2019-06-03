import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from 'antd';

import UserProfileModal from '../common/UserProfileModal';
// import UserProfileModalContainer from '../../containers/common/UserProfileModalContainer';

interface SProps {
  readonly loading?: boolean;
}
const Wrapper = styled.div<SProps>`
  height: 4.375rem;
  border-bottom: 1px solid #bdc3c7;
  padding-left: 10px;
  display: flex;
  ${({ loading }) =>
    !loading
      ? css`
          justify-content: center;
          align-items: center;
        `
      : css`
          cursor: pointer;
        `};
`;

const ProfileImage = styled.img`
  height: 3.125rem;
  width: 3.125rem;
  border: 1px solid #bdc3c7;
  border-radius: 0.875rem;
`;

const ProfileInfo = styled.div`
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  span:first-child {
    font-size: 20px;
    font-weight: 800;
  }

  span:last-child {
  }
`;

interface IProps {
  loading: boolean;
  username: string;
  userProfileImage: string;
  description: string;
  email: string;
  handleOnClick: () => void;
  isShow: boolean;
}
const MyProfile: React.FC<IProps> = ({
  loading,
  username,
  userProfileImage,
  description,
  email,
  handleOnClick,
  isShow,
}) => (
  <>
    <Wrapper loading={loading} onClick={handleOnClick}>
      {!loading ? (
        <Icon style={{ fontSize: '40px' }} type="loading" />
      ) : (
        <>
          <ProfileImage src={userProfileImage} alt="my_profile" />
          <ProfileInfo>
            <span>{username}</span>
            <span>{description}</span>
          </ProfileInfo>
        </>
      )}
    </Wrapper>
    <UserProfileModal
      isShow={isShow}
      handleOnClick={handleOnClick}
      username={username}
      userProfileImage={userProfileImage}
      description={description}
      email={email}
    />
  </>
);

export default MyProfile;
