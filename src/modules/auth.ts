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
  type: string;
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
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userRegisterRequest({ type: 'request', loading: true }));
      await endpoints.userRegister({
        email,
        password,
      });
      await dispatch(userRegisterSuccess({ type: 'success', loading: false }));
    } catch (err) {
      dispatch(userRegisterFailure({ type: 'fail', loading: false }));
    }
  };
};

// initialState
const initialState: AuthState = {
  type: '',
  loading: true,
};

// reducer
interface AuthAction {
  type: string;
  payload: AuthState;
}
const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_REGISTER_SUCCESS:
    case USER_REGISTER_FAILURE:
      return produce(state, draft => {
        draft.type = action.payload.type;
        draft.loading = action.payload.loading;
      });
    default:
      return state;
  }
};

// export reducer
export default reducer;
