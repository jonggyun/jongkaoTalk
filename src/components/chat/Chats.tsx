import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  flex: 1;
  padding-left: 0.625rem;
  overflow-y: auto;
`;

const ChatInfo = styled.article`
  display: flex;
  margin-bottom: 0.9375rem;
`;

const ChatImage = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  border: 1px solid #000;
  border-radius: 0.875rem;
`;

const ChatCenter = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.625rem;
  width: 15.625rem;
`;

const ChatTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 800;
  margin: 0;
  padding: 0;
`;

const ChatContent = styled.span`
  font-size: 0.875rem;
`;

const ChatUpdatedAt = styled.span`
  font-size: 0.875rem;
  color: #7f8c8d;
`;

interface IProps {}
const Chats: React.FC<IProps> = () => (
  <Wrapper>
    {/* <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat />
    <Chat /> */}
  </Wrapper>
);

// interface ChatProps {}
// const Chat: React.FC<ChatProps> = () => (
//   <ChatInfo>
//     <ChatImage />
//     <ChatCenter>
//       <ChatTitle>대화방 이름</ChatTitle>
//       <ChatContent>대화내용</ChatContent>
//     </ChatCenter>
//     <ChatUpdatedAt>오후 11:28</ChatUpdatedAt>
//   </ChatInfo>
// );

export default Chats;
