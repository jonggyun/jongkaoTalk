import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from 'antd';

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
      : null};
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
}
const MyProfile: React.FC<IProps> = ({
  loading,
  username,
  userProfileImage,
  description,
}) => (
  <Wrapper loading={loading}>
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
);

export default MyProfile;
