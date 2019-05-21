import React from 'react';
import styled from 'styled-components';

const FriendInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.9375rem;
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

interface IProps {}
const Friend: React.FC<IProps> = () => (
  <FriendInfo>
    <FriendImage />
    <span>대화명</span>
  </FriendInfo>
);

export default Friend;
