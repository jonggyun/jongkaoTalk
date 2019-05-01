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

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
// googleAuthProvider.addScope(
//   'https://www.googleapis.com/auth/contacts.readonly'
// );
// firebase
//   .auth()
//   .signInWithPopup(googleAuthProvider)
//   .then((result: any) => {
//     // 찾아서 확인하기!!
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const token = result.credential.accessToken;
//     // The signed-in user info.
//     const user = result.user;
//     // ...
//     console.log('success', token, user);
//   })
//   .catch(error => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     const credential = error.credential;
//     // ...
//     console.log('error', errorCode, errorMessage, email, credential);
//   });

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
