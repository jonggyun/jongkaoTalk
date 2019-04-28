import React from 'react';
import { Input, Button, Upload, Icon } from 'antd';
import styled from 'styled-components';

const WrapSection = styled.section`
  background-color: #fff;
  width: 25rem;
  border-radius: 0.3125rem;
  box-shadow: 1px 1px 3px 3px #dcdde1;
  padding: 0.9375rem 0.9375rem 1.875rem 0.9375rem;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 800;
`;

const InputBox = styled.div<{ comparePassword: boolean }>`
  margin-left: auto;
  margin-right: auto;
  & > span:nth-child(1),
  & > span:nth-child(2),
  & > span:nth-child(3),
  & > span:nth-child(4) {
    margin-bottom: 1.25rem;
  }
  /* & > span:nth-child(4) {
    margin-bottom: ${({ comparePassword }) =>
      comparePassword ? '1.25rem' : '0.25rem'};
  } */
  display: flex;
  flex-direction: column;
`;

const TypeStatement = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.3125rem;
  font-size: 0.75rem;
  span:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

const EmptySpace = styled.div`
  height: 1.5625rem;
`;

const InvalidLabel = styled.span`
  font-size: 12px;
  color: #e84118;
  margin-top: -1.0625rem;
`;

interface InputSectionProps {
  type: string;
  username: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  comparePassword: boolean;
  handleType: () => void;
  handleOnChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
}

const InputSection: React.FC<InputSectionProps> = ({
  type,
  handleType,
  handleOnChange,
  handleOnSubmit,
  username,
  nickname,
  password,
  confirmPassword,
  comparePassword,
}) => (
  <WrapSection>
    <Title>{type === 'login' ? 'Log In' : 'Sign Up'}</Title>
    {type === 'login' ? (
      <InputBox comparePassword={comparePassword}>
        <Input
          placeholder="username"
          allowClear
          onChange={handleOnChange}
          name="username"
          value={username}
          autoComplete="false"
        />
        <Input.Password
          placeholder="password"
          allowClear
          onChange={handleOnChange}
          name="password"
          value={password}
        />
        <Button
          type="primary"
          block
          onClick={handleOnSubmit}
          disabled={!(username && password)}
        >
          Log In
        </Button>
        <TypeStatement>
          <span onClick={handleType}>Sign Up</span>
        </TypeStatement>
      </InputBox>
    ) : (
      <InputBox comparePassword={comparePassword}>
        <Input
          placeholder="username"
          name="username"
          allowClear
          onChange={handleOnChange}
          value={username}
          autoComplete="false"
        />
        <Input
          placeholder="nickname"
          name="nickname"
          allowClear
          onChange={handleOnChange}
          value={nickname}
          autoComplete="false"
        />
        <Input.Password
          placeholder="password"
          name="password"
          allowClear
          onChange={handleOnChange}
          value={password}
        />
        <Input.Password
          placeholder="confirm password"
          name="confirmPassword"
          allowClear
          onChange={handleOnChange}
          value={confirmPassword}
        />
        {confirmPassword.length > 0 && !comparePassword ? (
          <InvalidLabel>
            Incorrect your password. Please compare password.
          </InvalidLabel>
        ) : null}
        <Upload>
          <Button>
            <Icon type="upload" />
            Upload Profile Image(not required)
          </Button>
        </Upload>
        <EmptySpace />
        <Button
          type="primary"
          block
          onClick={handleOnSubmit}
          disabled={!(username && nickname && password && comparePassword)}
        >
          Sign Up
        </Button>
        <TypeStatement>
          <span onClick={handleType}>Log In</span>
        </TypeStatement>
      </InputBox>
    )}
  </WrapSection>
);

export default InputSection;
