import React from 'react';
import styled from 'styled-components';

import Friend from './Friend';

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

interface IProps {}
const FriendList: React.FC<IProps> = () => (
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

export default FriendList;
