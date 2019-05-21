import React from 'react';
import styled from 'styled-components';

import ChattingRoom from './ChattingRoom';

const Wrapper = styled.section`
  flex: 1;
  padding-left: 0.625rem;
  overflow-y: auto;
`;

interface IProps {}
const ChattingRoomList: React.FC<IProps> = () => (
  <Wrapper>
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
    <ChattingRoom />
  </Wrapper>
);

export default ChattingRoomList;
