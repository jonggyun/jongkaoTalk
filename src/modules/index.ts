import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';
import auth, { AuthState } from './auth';

export interface RootState {
  auth: AuthState;
}

const rootReducer = combineReducers({
  auth,
  toastr: toastrReducer,
});

export default rootReducer;
