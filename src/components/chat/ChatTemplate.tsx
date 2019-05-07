import React from 'react';
import styled from 'styled-components';
import LeftPanelContainer from '../../containers/chat/LeftPanelContainer';

const leftWidth = '25rem';
const ChatSection = styled.section`
  display: flex;
`;

const LeftSection = styled.section`
  width: ${leftWidth};
  height: 100vh;
  border-right: 1px solid #bdc3c7;
  color: #000;
`;

const RightSection = styled.section`
  width: calc(100% - ${leftWidth});
  height: 100vh;
`;

interface ChatTemplateProps {}
const ChatTemplate: React.FC<ChatTemplateProps> = () => (
  <ChatSection>
    <LeftSection>
      <LeftPanelContainer />
    </LeftSection>
    <RightSection />
  </ChatSection>
);

export default ChatTemplate;
