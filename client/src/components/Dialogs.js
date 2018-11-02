// I may end up separating this into two separate components. One dialog for sign in and one for sign up.
// I didn't at first because of how I'm passing in the Navbar. I don't want to pass too many components into each other.

import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Import Navbar component
import Navbar from './Navbar'

// Import Function for Storing and Retrieving User's Token
import {
  getFromStorage,
  setInStorage
} from '../utils/storage';

// Creating some styles to Override material-ui
const errorStyle = {
  color: 'red',
  fontSize: 13,
  textAlign: 'right',
  paddingTop: 10
};

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

  // Button Handlers

  // Opens Dialog
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  // Closes Dialog
  handleClose = () => {
    this.setState({
      open: false,
      signInError: '',
      signUpError: ''
    });
  };

  // Changes Dialog From 'Sign In' to 'Sign Up'
  handleSignedUp = () => {
    this.setState({signedUp: false});
  };

  // Handle Submit New User
  handleUserSubmit = () => {
    // Target input fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordVerification = document.getElementById('passwordVerification').value;

    // Posts new user info to DB
    fetch('api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordVerification: passwordVerification
      }),
    }).then(res => res.json())
      .then(json => {
        // If post was successful,
        if (json.success) {
          // log out success message
          this.setState({
            signUpError: '',
            signedUp: true,
            signedIn: true
          });
          console.log(`Hello ${firstName}!`);
        } else {
        // Else log out error message
          this.setState({
            signUpError: json.message
          });
        }
      });
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

  // Renders Component to app
  render() {
    // If User is NOT Signed Up, and NOT signed in
    // Render navbar with a Sign Up button and a hidden Sign Up dialog
    // Else if User IS Signed Up, and NOT signed in
    // Render navbar with a Sign In button and a hidden Sign In dialog
    // Else Just render Navbar with Sign Out button

    // Sign Up Dialog
    if (!this.state.signedIn && !this.state.signedUp) {
      return(
        <div>
        {/* Passing the Navbar through the dialog so that the Navbar will be able to open the dialog */}
        {/* Create Navbar with 'Sign Up' button */}
        <Navbar open={this.handleClickOpen} isSignedIn={'Sign Up'}/>

        {/* Creates Sign Up Dialog */}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          onEnter={this.validateForm}
        >
          <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter the following information
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="firstName"
              label="First Name"
              type="text"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
              required
            />
            <TextField
              margin="dense"
              id="passwordVerification"
              label="Password Verification"
              type="password"
              fullWidth
              required
            />
            <DialogContentText style={errorStyle}>
              {this.state.signUpError}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleUserSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        </div>
      )
    } 

    // Sign In Dialog
    else if (!this.state.signedIn && this.state.signedUp) {
      return (
        <div>
          {/* Create Navbar with 'Sign In' button */}
          <Navbar open={this.handleClickOpen} isSignedIn={'Sign In'}/>

          {/* Creates Sign In dialog*/}
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter your user email and password.<br />
                If you do not have an account please
                <Button onClick={this.handleSignedUp} color="primary">
                  Sign Up
                </Button>
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
              />
              <DialogContentText style={errorStyle}>
                {this.state.signInError}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleUserSignIn} color="primary">
                Sign In
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    } 
    
    // Log Out Navbar
    else {
      return(
        <div>
          {/* Create Navbar with 'Sign Out' button */}
          <Navbar open={this.handleUserSignOut} isSignedIn={'Sign Out'}/>
        </div>
      );
    }
  };
};