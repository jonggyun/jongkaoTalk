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

const USER_OAUTH_REQUEST = 'auth/USER_OAUTH_REQUEST';
const USER_OAUTH_SUCCESS = 'auth/USER_OAUTH_SUCCESS';
const USER_OAUTH_FAILURE = 'auth/USER_OAUTH_FAILURE';

const USER_PROFILE_REGISTER_REQUEST = 'auth/USER_PROFILE_REGISTER_REQUEST';
const USER_PROFILE_REGISTER_SUCCESS = 'auth/USER_PROFILE_REGISTER_SUCCESS';
const USER_PROFILE_REGISTER_FAILURE = 'auth/USER_PROFILE_REGISTER_FAILURE';

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

interface ProfileState {
  type: string;
  loading: boolean;
  username: string;
  description: string;
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

export const userOauthRequest = (payload: LoginState) => ({
  type: USER_OAUTH_REQUEST,
  payload,
});

export const userOauthSuccess = (payload: LoginState) => ({
  type: USER_OAUTH_SUCCESS,
  payload,
});

export const userOauthFailure = (payload: LoginState) => ({
  type: USER_OAUTH_FAILURE,
  payload,
});

export const userProfileRegisterRegister = (payload: any) => ({
  type: USER_PROFILE_REGISTER_REQUEST,
  payload,
});

export const userProfileRegisterSuccess = (payload: any) => ({
  type: USER_PROFILE_REGISTER_SUCCESS,
  payload,
});

export const userProfileRegisterFailure = (payload: any) => ({
  type: USER_PROFILE_REGISTER_FAILURE,
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

// 이 부분을 firebase에서 처리하도록 바꾸기.
export const userOauth = () => {
  return async (dispatch: Dispatch) => {
    try {
      console.log('redux userOauth');
      dispatch(
        userOauthRequest({ type: 'request', loading: false, isLoggedIn: false })
      );

      await endpoints.googleLogin();

      await dispatch(
        userOauthSuccess({ type: 'success', loading: false, isLoggedIn: true })
      );
    } catch (err) {
      console.log('userOauth err:', err);
      dispatch(
        userOauthFailure({ type: 'fail', loading: false, isLoggedIn: false })
      );
    }
  };
};

export const userProfileRegister = ({
  username,
  description,
}: {
  username: string;
  description: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userProfileRegisterRegister({ type: 'request', loading: true }));

      await endpoints.userProfileRegister({ username, description });

      await dispatch(
        userProfileRegisterSuccess({ type: 'success', loading: false })
      );
    } catch (err) {
      console.log('userProfileRegister err:', err);
      dispatch(userProfileRegisterFailure({ type: 'fail', laoding: false }));
      toastr.error('Error', 'Register is failed.');
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
  isLoggedIn: true,
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
    | typeof USER_LOGIN_FAILURE
    | typeof USER_OAUTH_REQUEST
    | typeof USER_OAUTH_SUCCESS
    | typeof USER_OAUTH_FAILURE;
  payload: LoginState;
}

interface ProfileAction {
  type:
    | typeof USER_PROFILE_REGISTER_REQUEST
    | typeof USER_PROFILE_REGISTER_SUCCESS
    | typeof USER_PROFILE_REGISTER_FAILURE;
  payload: ProfileState;
}

export type AuthAction = RegisterAction | LoginAction | ProfileAction;

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
    case USER_OAUTH_REQUEST:
    case USER_OAUTH_SUCCESS:
    case USER_OAUTH_FAILURE:
      return produce(state, draft => {
        draft.type = action.payload.type;
        draft.loading = action.payload.loading;
        draft.isLoggedIn = action.payload.isLoggedIn;
      });
    case USER_PROFILE_REGISTER_REQUEST:
    case USER_PROFILE_REGISTER_SUCCESS:
    case USER_PROFILE_REGISTER_FAILURE:
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
