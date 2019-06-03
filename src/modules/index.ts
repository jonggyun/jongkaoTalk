import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';
import common, { CommonState } from './common';

export interface RootState {
  auth: AuthState;
  user: UserState;
  common: CommonState;
}

const rootReducer = combineReducers({
  auth,
  user,
  common,
  toastr: toastrReducer,
});

export default rootReducer;
