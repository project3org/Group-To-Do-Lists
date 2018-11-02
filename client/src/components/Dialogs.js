import React from 'react';

// Import Function for Storing and Retrieving User's Token
import { getFromStorage, setInStorage } from '../utils/storage';

// Creates and exports component
export default class FormDialog extends React.Component {
  // Creates States
  state = {
    open: false,
    signedIn: false,
    signedUp: true,
    signUpError: '',
    signInError: '',
    token: null
  };

  // Checks for user token
  componentDidMount() {
    // Get obj from storage
    const obj = getFromStorage('the_main_app');

    // If token exists in obj...
    if (obj && obj.token) {
      // ...verify token
      const { token } = obj;
      fetch(`/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          // If Response is successful
          if (json.success) {
            // Set State token to exsisting token and sign in to true
            this.setState({
              token,
              signedIn: true
            });
          };
        });
    } else {
      this.setState({
        signedIn: false
      });
    };
  };

  // Handle User Sign In
  handleUserSignIn = () => {

    // Target input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Posts new user info to DB
    fetch('api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    }).then(res => res.json())
      .then(json => {
        // If Sign In is successful,
        if (json.success) {
          // save user token in localStorage
          setInStorage('the_main_app', { token: json.token });
          // Set states
          this.setState({
            signInError: '',
            token: json.token,
            signedIn: true
          });

          // This is to target the signed in user's info for later use
          const user = json.userData
          console.log(`Hello ${user.firstName}!`);
        } else {
        // Else log out Server error message.
          this.setState({
            signInError: json.message
          });
        }
      });
  };

  // Handle 'Sign Out' Button
  handleUserSignOut = () => {
    this.setState({signedIn: false});

    // Get obj from storage
    const obj = getFromStorage('the_main_app');

    // If token exists in obj...
    if (obj && obj.token) {
      // ...delete token
      const { token } = obj;
      fetch(`/api/account/signout?token=${token}`)
        .then(res => res.json())
        .then(json => {
          // If Response is successful
          if (json.success) {
            // Set State token to blank and sign in to false
            this.setState({
              token: '',
              signedIn: false
            });
          };
        });
    } else {
      this.setState({
        signedIn: false
      });
    };
  };

};