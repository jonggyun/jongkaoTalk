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

const REQUEST_ME = 'auth/REQUEST_ME';

const USER_LOGOUT = 'auth/USER_LOGOUT';

// action creator
export interface ReigsterState {
  type: string;
  loading: boolean;
}

export interface LoginState {
  type: string;
  loading: boolean;
  isLoggedIn: boolean;
}

export interface ProfileState {
  type: string;
  loading: boolean;
}

export interface MeState {
  uid: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
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

export const userProfileRegisterRegister = (payload: ProfileState) => ({
  type: USER_PROFILE_REGISTER_REQUEST,
  payload,
});

export const userProfileRegisterSuccess = (payload: ProfileState) => ({
  type: USER_PROFILE_REGISTER_SUCCESS,
  payload,
});

export const userProfileRegisterFailure = (payload: ProfileState) => ({
  type: USER_PROFILE_REGISTER_FAILURE,
  payload,
});

export const requestMe = (payload: MeState) => ({
  type: REQUEST_ME,
  payload,
});

export const userLogout = (payload: LoginState) => ({
  type: USER_LOGOUT,
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
  return async (dispatch: any) => {
    try {
      dispatch(
        userLoginRequest({ type: 'request', loading: false, isLoggedIn: false })
      );
      await endpoints.userLogin({
        email,
        password,
      });
      const data = await endpoints.getUserInfo();
      dispatch(requestMe(data));
      dispatch(
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
  uid,
  username,
  description,
}: {
  uid: string;
  username: string;
  description: string;
}) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(userProfileRegisterRegister({ type: 'request', loading: true }));

      await endpoints.userProfileRegister({ uid, username, description });

      await dispatch(
        userProfileRegisterSuccess({ type: 'success', loading: false })
      );
    } catch (err) {
      console.log('userProfileRegister err:', err);
      dispatch(userProfileRegisterFailure({ type: 'fail', loading: false }));
      toastr.error('Error', 'Register is failed.');
    }
  };
};

// initialState
export interface AuthState {
  type: string;
  loading: boolean;
  isLoggedIn: boolean;
  me: MeState;
}
const initialState: AuthState = {
  type: '',
  loading: true,
  isLoggedIn: false,
  me: {
    uid: '',
    email: '',
    emailVerified: false,
    isAnonymous: false,
  },
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

interface RequestMeAction {
  type: typeof REQUEST_ME;
  payload: MeState;
}

interface LogoutAction {
  type: typeof USER_LOGOUT;
  payload: LoginState;
}

export type AuthAction =
  | RegisterAction
  | LoginAction
  | ProfileAction
  | RequestMeAction
  | LogoutAction;

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
    case REQUEST_ME:
      return produce(state, draft => {
        draft.me = action.payload;
      });
    case USER_LOGOUT:
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
