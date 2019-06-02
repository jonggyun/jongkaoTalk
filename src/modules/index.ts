import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';

export interface RootState {
  auth: AuthState;
  user: UserState;
}

const rootReducer = combineReducers({
  auth,
  user,
  toastr: toastrReducer,
});

export default rootReducer;
