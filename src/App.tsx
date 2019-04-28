import React from 'react';
import { Route } from 'react-router';

import MainPage from './pages/MainPage';

const App: React.FC = () => {
  return (
    <>
      <Route exact path="/" component={MainPage} />
    </>
  );
};

export default App;
