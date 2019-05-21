import { firestoreDB, firebaseAuth, storageRef } from './init';

export const profileRegister = ({
  uid,
  username,
  description,
}: {
  uid: string;
  username: string;
  description: string;
}) => {
  const user = firebaseAuth.currentUser;
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
