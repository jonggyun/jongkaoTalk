import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { RootState } from './modules/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import ProfileSetting from './pages/ProfileSettingPage';
import { firebaseAuth } from './lib/firebase/init';

import { userLoginSuccess } from './modules/auth';
interface LoginType {
  type: string;
  loading: boolean;
  isLoggedIn: boolean;
}
interface AppProps {
  isLoggedIn: boolean;
  userLoginSuccess: ({ type, loading, isLoggedIn }: LoginType) => void;
}
const App: React.FC<RouteComponentProps<{}> & AppProps> = ({
  isLoggedIn,
  userLoginSuccess,
}) => {
  const [persistenceUser, setPersistenceUser] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(user => {
      user ? setPersistenceUser(true) : setPersistenceUser(false);
    });
  }, []);

  if (persistenceUser) {
    userLoginSuccess({ type: 'success', loading: false, isLoggedIn: true });
  }
  return isLoggedIn ? <PrivateRoute key={1} /> : <PublicRoute key={2} />;
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
    }),
    {
      userLoginSuccess,
    }
  )(App)
);
