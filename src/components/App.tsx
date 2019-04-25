import React from 'react';
import { Route } from 'react-router';

import LoginPage from '../pages/LoginPage';

const App: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={LoginPage} />
    </>
  );
};

export default App;
