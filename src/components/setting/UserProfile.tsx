import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

const Wrapper = styled.section`
  height: 100vh;
  background-color: #ffeb3b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileInfo = styled.section`
  background-color: #fff;
  width: 25rem;
  border-radius: 0.3125rem;
  box-shadow: 1px 1px 3px 3px #dcdde1;
  padding: 0.9375rem 0.9375rem 1.875rem 0.9375rem;
`;
const Upper = styled.div`
  display: flex;
  margin-bottom: 1.25rem;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 2;
`;

const InputImage = styled.div`
  height: 126px;
  width: 126px;
  border: 1px dashed #d9d9d9;
  background-color: #fafafa;
  border-radius: 0.3125rem;
  margin-right: 8px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 1;
  cursor: pointer;

  input[type='file'] {
    /* position: absolute; */
    display: none;
  }
`;

const InputImagePlus = styled.span`
  font-size: 40px;
`;

interface UserProfileProps {
  username: string;
  description: string;
  handleOnChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
  handleUploadFile: (e: React.FormEvent<HTMLInputElement>) => void;
}
const UserProfile: React.FC<UserProfileProps> = ({
  username,
  description,
  handleOnChange,
  handleOnSubmit,
  handleUploadFile,
}) => {
  return (
    <Wrapper>
      <ProfileInfo>
        <Upper>
          <label htmlFor="ex_file">
            <InputImage>
              <InputImagePlus>+</InputImagePlus>
              <span>Upload</span>
              <input type="file" id="ex_file" onChange={handleUploadFile} />
            </InputImage>
          </label>
          <InputWrapper>
            <Input
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleOnChange}
              autoComplete="off"
            />
            <Input
              placeholder="Description"
              name="description"
              value={description}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </InputWrapper>
        </Upper>
        <Button type="primary" block onClick={handleOnSubmit}>
          Submit
        </Button>
      </ProfileInfo>
    </Wrapper>
  );
};

export default UserProfile;
