// import
import { Dispatch } from 'redux';
import produce from 'immer';
import endpoints from '../lib/endpoints/auth';

// actions
const USER_REGISTER_REQUEST = 'auth/USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'auth/USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILURE = 'auth/USER_REGISTER_FAILURE';

const USER_LOGIN_REQUEST = 'auth/USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'auth/USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'auth/USER_LOGIN_FAILURE';

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

export const userLoginRequest = (payload: any) => ({
  type: USER_LOGIN_REQUEST,
  payload,
});

export const userLoginSuccess = (payload: any) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

export const userLoginFailure = (payload: any) => ({
  type: USER_LOGIN_FAILURE,
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
      console.log('userRegister err:', err);
      dispatch(userRegisterFailure({ type: 'fail', loading: false }));
    }
  };
};

export const userLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userLoginRequest({ type: 'request', loading: false }));
      await endpoints.userLogin({
        email,
        password,
      });
      await dispatch(userLoginSuccess({ type: 'success', loading: false }));
      console.log('success');
    } catch (err) {
      console.log('userLogin err:', err);
      dispatch(userLoginFailure({ type: 'fail', loading: false }));
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
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_FAILURE:
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
