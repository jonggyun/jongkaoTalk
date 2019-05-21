import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 4.375rem;
  border-bottom: 1px solid #bdc3c7;
  padding-left: 10px;
  display: flex;
`;

const ProfileImage = styled.div`
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

interface IProps {}
const MyProfile: React.FC<IProps> = () => (
  <Wrapper>
    <ProfileImage />
    <ProfileInfo>
      <span>이름</span>
      <span>대화명인가</span>
    </ProfileInfo>
  </Wrapper>
);

export default MyProfile;
