import { firebaseInit, firebaseAuth, googleAuthProvider } from './init';

export const googleAuth = () => {
  googleAuthProvider.addScope(
    'https://www.googleapis.com/auth/contacts.readonly'
  );
  firebaseAuth.signInWithRedirect(googleAuthProvider);
  firebaseAuth
    .getRedirectResult()
    .then((result: any) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        console.log('token!!!!!', token);
      }
    })
    .catch(error => {
      const { code, message, email, credential } = error;

      console.log('err', code, message, email, credential);
    });
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await firebaseAuth
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
      throw new Error(err);
    });
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // await firebaseAuth.setPersistence(firebaseInit.auth.Auth.Persistence.SESSION);
  await firebaseAuth.signInWithEmailAndPassword(email, password).catch(err => {
    throw new Error(err);
  });
};

export const logout = () => {
  firebaseAuth
    .signOut()
    .then(() => {
      console.log('logout');
    })
    .catch(err => {
      console.log('err', err);
    });
};

export const currentUser = () => {
  const user = firebaseAuth.currentUser;
  const { uid, email, emailVerified, isAnonymous } = user;

  return { uid, email, emailVerified, isAnonymous };
};
