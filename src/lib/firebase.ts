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
export const firestoreDB = firebase.firestore();
export const storage = firebase.storage();
export const storageRef = storage.ref();

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

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('logout');
    })
    .catch(err => {
      console.log('err', err);
    });
};

export const currentUser = () => {
  const user = firebase.auth().currentUser;
  const { uid, email, emailVerified, isAnonymous } = user;

  return { uid, email, emailVerified, isAnonymous };
};

export const profileRegister = ({
  uid,
  username,
  description,
}: {
  uid: string;
  username: string;
  description: string;
}) => {
  const user = firebase.auth().currentUser;
  user
    .updateProfile({
      displayName: username,
      // photoURL: 'adress!!!',
    })
    .then(() => {
      // Update successful.
      firestoreDB
        .collection('users')
        .doc(uid)
        .set({ username, description })
        .catch(err => console.log('failure', err));
    })
    .catch(error => {
      console.log('err', error);
    });
};

export const uploadProfileImage = ({
  uid,
  file,
}: {
  uid: string;
  file: File;
}) => {
  storageRef
    .child(`profile/${uid}.${file.name.split('.')[1]}`)
    .put(file)
    .then(snapshot => {
      console.log('success!!!!', snapshot);
    })
    .catch(err => {
      console.log('err', err);
    });
};
