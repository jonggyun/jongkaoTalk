import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  flex: 1;
  padding-left: 0.625rem;
  overflow-y: auto;
`;

const Title = styled.span`
  display: inline-block;
  padding: 0.625rem 0;
`;

const FriendsWrapper = styled.div``;

const FriendInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  span {
    padding-left: 0.875rem;
    font-size: 1.125rem;
  }
`;

const FriendImage = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  border-radius: 14px;
`;

interface FriendsProps {}
const Friends: React.FC<FriendsProps> = () => (
  <Wrapper>
    <Title>친구 222</Title>
    <FriendsWrapper>
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
      <Friend />
    </FriendsWrapper>
  </Wrapper>
);

const Friend = () => (
  <FriendInfo>
    <FriendImage />
    <span>대화명</span>
  </FriendInfo>
);

export default Friends;
