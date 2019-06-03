import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

interface ModalWrapperProps {
  readonly isShow: boolean;
}
const ModalWrapper = styled.section<ModalWrapperProps>`
  display: ${({ isShow }) => (isShow ? 'flex' : 'none')};
  position: fixed;
  z-index: 999999;
  background-color: rgba(0, 0, 0, 0.1);
  top: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const ProfileArticle = styled.article`
  display: flex;
  flex-direction: column;
  height: 31.25rem;
  width: 26.875rem;
  position: relative;
`;

const ExitButton = styled.span`
  font-size: 20px;
  position: absolute;
  top: 3%;
  left: 4%;
  cursor: pointer;
`;

const TopImageSection = styled.section`
  background-color: #ffeb3b;
  height: 70%;
  border-top-left-radius: 1.25rem;
  border-top-right-radius: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Description = styled.span`
  font-size: 1.25rem;
`;

const ProfileImage = styled.img`
  position: absolute;
  width: 100px;
  height: 100px;
  background-color: #000;
  top: 60%;
  left: 50%;
  transform: translateX(-50%) translateY(-20%);
  border-radius: 2.5rem;
  /* border: 1px solid black; */
`;

const ButtonSection = styled.section`
  height: 30%;
  background-color: #fff;
  border-bottom-left-radius: 1.25rem;
  border-bottom-right-radius: 1.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserNameSpan = styled.span`
  font-size: 1rem;
  color: #000;
`;

const UserEmailDiv = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  padding: 0 0.625rem;
`;

interface IProps {
  isShow: boolean;
  handleOnClick: () => void;
  username: string;
  userProfileImage: string;
  description: string;
  email: string;
}
const UserProfileModal: React.FC<IProps> = ({
  isShow,
  handleOnClick,
  username,
  userProfileImage,
  description,
  email,
}) => (
  <ModalWrapper isShow={isShow}>
    <ProfileArticle>
      <ExitButton onClick={handleOnClick}>
        <Icon type="close" />
      </ExitButton>
      <TopImageSection>
        <Description>{description}</Description>
      </TopImageSection>
      <ProfileImage src={userProfileImage} alt="user_image" />
      <ButtonSection>
        <UserNameSpan>{username}</UserNameSpan>
        <UserEmailDiv>{email}</UserEmailDiv>
      </ButtonSection>
    </ProfileArticle>
  </ModalWrapper>
);

export default UserProfileModal;
