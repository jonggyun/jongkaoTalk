import firebase from 'firebase';
import { constant } from '../../constant';

const firebaseConfig = {
  apiKey: constant.FIREBASE.API_KEY,
  authDomain: constant.FIREBASE.AUTH_DOMAIN,
  databaseURL: constant.FIREBASE.DATABASE_URL,
  projectId: constant.FIREBASE.PROJECT_ID,
  storageBucket: constant.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: constant.FIREBASE.MESSAGING_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

export const firebaseInit = firebase;
export const firebaseDB = firebase.database();
export const firestoreDB = firebase.firestore();
export const firebaseAuth = firebase.auth();
export const storage = firebase.storage();
export const storageRef = storage.ref();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
