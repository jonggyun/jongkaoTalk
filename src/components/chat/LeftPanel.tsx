import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

import MyProfile from './MyProfile';
import FriendList from './FriendList';
import ChattingRoomList from './ChattingRoomList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: inherit;
`;
const Header = styled.div`
  height: 3.4375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.25rem;
`;

const HeaderTitle = styled.span`
  font-size: 1.75rem;
  font-weight: 800;
`;

const HeaderIcons = styled.div`
  display: flex;
  align-items: center;
  & > i {
    margin: 0 10px;
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  height: 2.8125rem;
  margin-top: auto;
  margin-bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #bdc3c7;

  & > i {
    cursor: pointer;
  }
`;

interface IProps {
  handleLeftType: (e: React.MouseEvent<HTMLElement>) => void;
  type: string;
}
const LeftPanel: React.FC<IProps> = ({ handleLeftType, type }) => (
  <Wrapper>
    <Header>
      <HeaderTitle>{type === 'friend' ? '친구' : '채팅'}</HeaderTitle>
      <HeaderIcons>
        <Icon style={{ fontSize: '22px' }} type="search" />
        <Icon style={{ fontSize: '22px' }} type="user-add" />
        <Icon style={{ fontSize: '22px' }} type="setting" />
      </HeaderIcons>
    </Header>
    {type === 'friend' ? (
      <React.Fragment>
        <MyProfile />
        <FriendList />
      </React.Fragment>
    ) : (
      <ChattingRoomList />
    )}
    <Footer>
      <span data-type="friend" onClick={handleLeftType}>
        <Icon style={{ fontSize: '22px' }} type="user" />
      </span>
      <span data-type="message" onClick={handleLeftType}>
        <Icon style={{ fontSize: '22px' }} type="message" />
      </span>
    </Footer>
  </Wrapper>
);

export default LeftPanel;
