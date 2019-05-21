import React from 'react';
import { Input, Button, Icon } from 'antd';
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

const InputBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  & > span:nth-child(1),
  & > span:nth-child(2),
  & > span:nth-child(3) {
    margin-bottom: 1.25rem;
  }
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

const InvalidLabel = styled.span`
  font-size: 12px;
  color: #e84118;
  margin-top: -1.0625rem;
`;

const BroderLine = styled.hr`
  width: 100%;
  border: 1px solid #dcdde1;
`;

const GoogleButton = styled.div`
  height: 2rem;
  background-color: #de4a39;
  border-radius: 0.3125rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > span:last-child {
    margin-left: 0.625rem;
    color: #fff;
    font-size: 1rem;
  }
`;

interface IProps {
  type: string;
  pageType: string;
  email: string;
  password: string;
  confirmPassword: string;
  comparePassword: boolean;
  handleType: () => void;
  handleOnChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleOnSubmit: () => void;
  handleGoogleLogin: () => void;
}

const InputSection: React.FC<IProps> = ({
  type,
  pageType,
  handleType,
  handleOnChange,
  handleOnSubmit,
  handleGoogleLogin,
  email,
  password,
  confirmPassword,
  comparePassword,
}) => (
  <WrapSection>
    <Title>{pageType === 'login' ? 'Log In' : 'Sign Up'}</Title>
    {pageType === 'login' ? (
      <InputBox>
        <Input
          placeholder="email"
          allowClear
          type="email"
          onChange={handleOnChange}
          name="email"
          value={email}
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
          disabled={!(email && password)}
        >
          Log In
        </Button>
        <TypeStatement>
          <span onClick={handleType}>Sign Up</span>
        </TypeStatement>
        <BroderLine />
        <GoogleButton onClick={handleGoogleLogin}>
          <Icon type="google" style={{ fontSize: '1.25rem', color: '#fff' }} />
          <span>Log in with Google</span>
        </GoogleButton>
      </InputBox>
    ) : (
      <InputBox>
        <Input
          placeholder="Email"
          name="email"
          type="email"
          allowClear
          onChange={handleOnChange}
          value={email}
          autoComplete="false"
        />
        <Input.Password
          placeholder="Password(number,special,case,longer than 8)"
          name="password"
          allowClear
          onChange={handleOnChange}
          value={password}
        />
        <Input.Password
          placeholder="Confirm password"
          name="confirmPassword"
          allowClear
          onChange={handleOnChange}
          value={confirmPassword}
        />
        {confirmPassword.length > 0 && !comparePassword ? (
          <InvalidLabel>
            Incorrect your password. Please compare password.
          </InvalidLabel>
        ) : type.indexOf('fail') !== -1 ? (
          <InvalidLabel>
            Please check your email(Already signed up) or password.
          </InvalidLabel>
        ) : null}
        <Button
          type="primary"
          block
          onClick={handleOnSubmit}
          disabled={!(email && password && comparePassword)}
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
