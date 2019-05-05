// import
import { Dispatch } from 'redux';
import produce from 'immer';
import endpoints from '../lib/endpoints/auth';
import { toastr } from 'react-redux-toastr';

// actions
const USER_REGISTER_REQUEST = 'auth/USER_REGISTER_REQUEST';
const USER_REGISTER_SUCCESS = 'auth/USER_REGISTER_SUCCESS';
const USER_REGISTER_FAILURE = 'auth/USER_REGISTER_FAILURE';

const USER_LOGIN_REQUEST = 'auth/USER_LOGIN_REQUEST';
const USER_LOGIN_SUCCESS = 'auth/USER_LOGIN_SUCCESS';
const USER_LOGIN_FAILURE = 'auth/USER_LOGIN_FAILURE';

// action creator
interface ReigsterState {
  type: string;
  loading: boolean;
}

interface LoginState {
  type: string;
  loading: boolean;
  isLoggedIn: boolean;
}

export const userRegisterRequest = (payload: ReigsterState) => ({
  type: USER_REGISTER_REQUEST,
  payload,
});

export const userRegisterSuccess = (payload: ReigsterState) => ({
  type: USER_REGISTER_SUCCESS,
  payload,
});

export const userRegisterFailure = (payload: ReigsterState) => ({
  type: USER_REGISTER_FAILURE,
  payload,
});

export const userLoginRequest = (payload: LoginState) => ({
  type: USER_LOGIN_REQUEST,
  payload,
});

export const userLoginSuccess = (payload: LoginState) => ({
  type: USER_LOGIN_SUCCESS,
  payload,
});

export const userLoginFailure = (payload: LoginState) => ({
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
      toastr.success('Success', 'Sign up success');
    } catch (err) {
      console.log('userRegister err:', err);
      dispatch(userRegisterFailure({ type: 'fail', loading: false }));
      toastr.error('Error', 'Sign up failed.');
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
      dispatch(
        userLoginRequest({ type: 'request', loading: false, isLoggedIn: false })
      );
      await endpoints.userLogin({
        email,
        password,
      });
      await dispatch(
        userLoginSuccess({ type: 'success', loading: false, isLoggedIn: true })
      );
      toastr.success('Success', 'Login success.');
    } catch (err) {
      console.log('userLogin err:', err);
      dispatch(
        userLoginFailure({ type: 'fail', loading: false, isLoggedIn: false })
      );
      toastr.error('Error', 'Login failed.');
    }
  };
};

// initialState
export interface AuthState {
  type: string;
  loading: boolean;
  isLoggedIn: boolean;
}
const initialState: AuthState = {
  type: '',
  loading: true,
  isLoggedIn: false,
};

// reducer

interface RegisterAction {
  type:
    | typeof USER_REGISTER_SUCCESS
    | typeof USER_REGISTER_REQUEST
    | typeof USER_REGISTER_FAILURE;
  payload: ReigsterState;
}

interface LoginAction {
  type:
    | typeof USER_LOGIN_REQUEST
    | typeof USER_LOGIN_SUCCESS
    | typeof USER_LOGIN_FAILURE;
  payload: LoginState;
}

export type AuthAction = RegisterAction | LoginAction;

const reducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
    case USER_REGISTER_SUCCESS:
    case USER_REGISTER_FAILURE:
      return produce(state, draft => {
        draft.type = action.payload.type;
        draft.loading = action.payload.loading;
      });
    case USER_LOGIN_REQUEST:
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_FAILURE:
      return produce(state, draft => {
        draft.type = action.payload.type;
        draft.loading = action.payload.loading;
        draft.isLoggedIn = action.payload.isLoggedIn;
      });
    default:
      return state;
  }
};

// export reducer
export default reducer;
