import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { RootState } from './modules/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import ProfileSetting from './pages/ProfileSettingPage';
import { firebaseAuth } from './lib/firebase/init';

import {
  userLoginSuccess,
  requestMe,
  LoginState,
  MeState,
} from './modules/auth';

interface AppProps {
  isLoggedIn: boolean;
  me: MeState;
  userLoginSuccess: ({ type, loading, isLoggedIn }: LoginState) => void;
  requestMe: ({ uid, email, emailVerified, isAnonymous }: MeState) => void;
}
const App: React.FC<RouteComponentProps<{}> & AppProps> = ({
  isLoggedIn,
  me,
  userLoginSuccess,
  requestMe,
}) => {
  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        userLoginSuccess({ type: 'success', loading: false, isLoggedIn: true });
        requestMe(user);
      }
    });
  }, []);

  return isLoggedIn && me.uid ? (
    <PrivateRoute key={1} />
  ) : (
    <PublicRoute key={2} />
  );
};

const PublicRoute = () => (
  <React.Fragment>
    <Route exact path="/" component={MainPage} />
  </React.Fragment>
);

const PrivateRoute = () => (
  <React.Fragment>
    <Route exact path="/setting" component={ProfileSetting} />
    <Route exact path="/" component={ChatPage} />
  </React.Fragment>
);

export default withRouter(
  connect(
    (state: RootState, ownProps) => ({
      isLoggedIn: state.auth.isLoggedIn,
      me: state.auth.me,
    }),
    {
      userLoginSuccess,
      requestMe,
    }
  )(App)
);
