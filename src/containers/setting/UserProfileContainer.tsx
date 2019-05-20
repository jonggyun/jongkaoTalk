import React, { useState } from 'react';
import { connect } from 'react-redux';
import { userProfileRegister } from '../../modules/auth';
import { RootState } from '../../modules/index';
import UserProfile from '../../components/setting/UserProfile';

// import { storageRef } from '../../lib/firebase';

interface ProfileProps {
  uid: string;
  username: string;
  description: string;
}
interface UserProfileContainerProps {
  userProfileRegister: ({ uid, username, description }: ProfileProps) => void;
  uid: string;
}
const UserProfileContainer: React.FC<UserProfileContainerProps> = ({
  userProfileRegister,
  uid,
}) => {
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  // const [loading, setLoading] = useState(false);

  // 이미지 참조하는 방법.
  // useEffect(() => {
  //   console.log('user profile Container!!!');
  //   const profile = storageRef.child('profile/3.jpeg');
  //   profile
  //     .getDownloadURL()
  //     .then(res => {
  //       console.log('res', res);
  //       setImgsrc(res);
  //     })
  //     .catch(err => console.log(err));
  // });

  const handleUploadFile = (e: React.FormEvent<HTMLInputElement>) => {
    console.log('event', e.currentTarget.files);
    console.log('event!!', e.currentTarget);
    console.log('uid', uid);
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    name === 'username' ? setUsername(value) : setDescription(value);
  };

  const handleOnSubmit = () => {
    userProfileRegister({ uid, username, description });
  };

  return (
    <UserProfile
      username={username}
      description={description}
      handleOnChange={handleOnChange}
      handleOnSubmit={handleOnSubmit}
      handleUploadFile={handleUploadFile}
    />
  );
};

export default connect(
  (state: RootState, ownProps) => ({
    uid: state.auth.me.uid,
  }),
  {
    userProfileRegister,
  }
)(UserProfileContainer);
