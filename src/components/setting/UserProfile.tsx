import React from 'react';
import styled from 'styled-components';
import { Input, Upload, Icon, message, Button } from 'antd';

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
  width: 100%;
  justify-content: space-around;
`;

interface UserProfileProps {}
const UserProfile: React.FC<UserProfileProps> = () => {
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const imageUrl = '';

  return (
    <Wrapper>
      <ProfileInfo>
        <Upper>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            // beforeUpload={beforeUpload}
            // onChange={this.handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
          </Upload>
          <InputWrapper>
            <Input placeholder="Username" />
            <Input placeholder="Description" />
          </InputWrapper>
        </Upper>
        <Button type="primary" block>
          Submit
        </Button>
      </ProfileInfo>
    </Wrapper>
  );
};

export default UserProfile;
