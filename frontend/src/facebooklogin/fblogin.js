import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login';

class FbLogin extends Component {

  render() {

    const responseFacebook = (response) => {
      console.log(response);
    }

    return (
      <div className="App">
        <h1>LOGIN WITH FACEBOOK AND GOOGLE</h1>

      <FacebookLogin
        appId="757640369514862" //APP ID NOT CREATED YET
        fields="name,email,picture"
        callback={responseFacebook}
      />

      </div>
    );
  }
}

export default FbLogin;