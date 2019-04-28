// import
import { Dispatch } from 'redux';
import produce from 'immer';
import endpoints from '../lib/endpoints/auth';

// actions
const USER_REGISTER_REQUEST = 'auth/USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'auth/USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILURE = 'auth/USER_REGISTER_FAILURE';

// action creator
export interface AuthState {
  loading: boolean;
}
export const userRegisterRequest = (payload: AuthState) => ({
  type: USER_REGISTER_REQUEST,
  payload,
});

export const userRegisterSuccess = (payload: AuthState) => ({
  type: USER_REGISTER_SUCCESS,
  payload,
});

export const userRegisterFailure = (payload: AuthState) => ({
  type: USER_REGISTER_FAILURE,
  payload,
});

// api actions
export const userRegister = ({
  username,
  nickname,
  password,
}: {
  username: string;
  nickname: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userRegisterRequest({ loading: true }));
      await endpoints.userRegister({ username, nickname, password });
      dispatch(userRegisterSuccess({ loading: false }));
    } catch (e) {
      dispatch(userRegisterFailure({ loading: false }));
    }
  };
};

// initialState
const initialState: AuthState = {
  loading: true,
};

// reducer
interface AuthAction {
  type: string;
  payload: {
    loading: boolean;
  };
}
const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_REGISTER_FAILURE:
      return produce(state, draft => {
        draft.loading = action.payload.loading;
      });
    case USER_REGISTER_SUCCESS:
      return produce(state, draft => {
        draft.loading = action.payload.loading;
      });
    default:
      return state;
  }
};

// export reducer
export default reducer;
