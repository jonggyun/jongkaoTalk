import firebase from 'firebase';
import { constant } from '../constant';

const firebaseConfig = {
  apiKey: constant.FIREBASE.API_KEY,
  authDomain: constant.FIREBASE.AUTH_DOMAIN,
  databaseURL: constant.FIREBASE.DATABASE_URL,
  projectId: constant.FIREBASE.PROJECT_ID,
  storageBucket: constant.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: constant.FIREBASE.MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseDB = firebase.database();

export const googleAuth = () => {
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
  googleAuthProvider.addScope(
    'https://www.googleapis.com/auth/contacts.readonly'
  );
  firebase.auth().signInWithRedirect(googleAuthProvider);
  firebase
    .auth()
    .getRedirectResult()
    .then((result: any) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      const user = result.user;
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  await firebase
    .auth()
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
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      throw new Error(err);
    });
};
