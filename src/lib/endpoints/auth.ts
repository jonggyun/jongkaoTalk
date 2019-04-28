import { firebaseDB } from '../firebase';

const userRegister = async ({
  username,
  nickname,
  password,
}: {
  username: string;
  nickname: string;
  password: string;
}) => {
  try {
    console.log('userSignUp', username, nickname, password);
    firebaseDB.ref(`account/${username}`).set({
      username,
      nickname,
      password,
    });
  } catch (e) {
    console.log('error');
    throw new Error(e);
  }
};

const endpoints = {
  userRegister,
};

export default endpoints;
