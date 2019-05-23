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
    .then(() => {
      firestoreDB
        .collection('users')
        .doc(uid)
        .update({
          profileImage: `${uid}.${file.name.split('.')[1]}`,
        });
    })
    .catch(err => {
      console.log('err', err);
    });
};

export const getProfileImage = async ({ uid }: { uid: string }) => {
  try {
    const doc = await firestoreDB
      .collection('users')
      .doc(uid)
      .get();

    const image = await storageRef
      .child(`profile/${doc.data().profileImage}`)
      .getDownloadURL();

    return image;
  } catch (err) {
    console.log('getProfileImage err: ', err);
    return '';
  }
};
