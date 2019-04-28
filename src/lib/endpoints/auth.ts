import { firebaseDB } from '../firebase';
import CryptoJS from 'crypto-js';
import { KEY } from '../../constant';

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
    // const bytes = CryptoJS.AES.decrypt(
    //   mypassword.toString(),
    //   KEY.CRYPTO_MY_SECRET_KEY
    // );
    // const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    // console.log('decrypto', decryptedData);
    firebaseDB.ref(`account/${username}`).set({
      username,
      nickname,
      password: CryptoJS.AES.encrypt(
        password,
        KEY.CRYPTO_MY_SECRET_KEY
      ).toString(),
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
