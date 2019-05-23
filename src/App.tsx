import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { RootState } from './modules/index';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import MainPage from './pages/MainPage';
import ChatPage from './pages/ChatPage';
import ProfileSetting from './pages/ProfileSettingPage';

interface AppProps {
  isLoggedIn: boolean;
}
const App: React.FC<RouteComponentProps<{}> & AppProps> = ({ isLoggedIn }) => {
  console.log('sessionStorage', sessionStorage);
  return isLoggedIn ? <PrivateRoute key={1} /> : <PublicRoute key={2} />;
};

const PublicRoute = () => (
  <React.Fragment>
    <Route exact path="/" component={MainPage} />
  </React.Fragment>
);

const PrivateRoute = () => (
  <React.Fragment>
    <Route exact path="/" component={ProfileSetting} />
    <Route exact path="/chattingrooms" component={ChatPage} />
  </React.Fragment>
);

export default withRouter(
  connect((state: RootState, ownProps) => ({
    isLoggedIn: state.auth.isLoggedIn,
  }))(App)
);
