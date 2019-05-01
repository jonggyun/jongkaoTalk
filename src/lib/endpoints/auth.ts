import { createUser } from '../firebase';

interface UserRegisterProps {
  email: string;
  password: string;
}

const userRegister = async ({ email, password }: UserRegisterProps) => {
  try {
    createUser({ email, password });
  } catch (e) {
    console.log('error: userRegister');
    throw new Error(e);
  }
};

const endpoints = {
  userRegister,
};

export default endpoints;
