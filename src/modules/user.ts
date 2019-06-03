// import
import { Dispatch } from 'redux';
// import { ThunkDispatch } from 'redux-thunk';
import produce from 'immer';
// import { toastr } from 'react-redux-toastr';

import * as UserFirebase from '../lib/firebase/user';

// actions
const MY_PROFILE = 'user/GET_MY_PROFILE';

// action creator
interface UserDocument {
  username: string;
  userProfileImage: string;
  description: string;
  email: string;
}

export const myProfile = (payload: UserDocument) => ({
  type: MY_PROFILE,
  payload,
});

// api actions
export const getUserInfo = (uid: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const {
        username,
        userProfileImage,
        description,
        email,
      } = await UserFirebase.getUserProfile(uid);
      dispatch(myProfile({ username, userProfileImage, description, email }));
    } catch (err) {
      console.log('err', err);
    }
  };
};

// initialState
export interface UserState {
  loading: boolean;
  myProfile: UserDocument;
}
const initialState: UserState = {
  loading: false,
  myProfile: {
    username: '',
    userProfileImage: '',
    description: '',
    email: '',
  },
};

// reducer
interface MyProfileAction {
  type: typeof MY_PROFILE;
  payload: UserDocument;
}
export type UserAction = MyProfileAction;
const reducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
    case MY_PROFILE:
      return produce(state, draft => {
        draft.loading = true;
        draft.myProfile = action.payload;
      });
    default:
      return state;
  }
};

// export reducer
export default reducer;
