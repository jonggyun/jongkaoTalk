import React, { Component } from 'react';

import { firebaseDB } from '../lib/firebase';

class LoginPage extends Component {
  render() {
    console.log('asdasdas');
    firebaseDB.ref('testdata').on('value', (snapshot: any) => {
      console.log('snapshot', snapshot.val());
    });
    return <div>LoginPage</div>;
  }
}

export default LoginPage;
