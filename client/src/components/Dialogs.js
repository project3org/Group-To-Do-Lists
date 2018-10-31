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

// Import Function for Storing and Retrieving User Token
import {
  getFromStorage,
  setInStorage
} from '../utils/storage';

// Creates and exports component
export default class FormDialog extends React.Component {
  // Creates States
  state = {
    open: false,
    signedIn: false,
    signedUp: true,
    token: null
  };

  // Checks for Token
  componentDidMount() {
    const token = getFromStorage('the_main_app');

    // If token exists...
    if (token) {
      // ...verify token
      fetch(`/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
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
    this.setState({ open: false });
  };

  // Changes Dialog From 'Sign In' to 'Sign Up'
  handleSignedUp = () => {
    this.setState({signedUp: false});
  };

  // Handle Submit New User Button
  handleUserSubmit = () => {
    this.setState({signedUp: true});
    this.setState({signedIn: true});

    // Target input fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

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
        password: password
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message
          });
        } else {
          this.setState({
            signUpError: json.message
          })
        }
      });
  };

  // Handle 'Sign Out' Button
  handleUserSignOut = () => {
    this.setState({signedIn: false});
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
              onChange={this.onTextboxChangeSignUpFirstName}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="lastName"
              label="Last Name"
              type="text"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="password"
              fullWidth
            />
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
                id="Email"
                label="Email Address"
                type="email"
                fullWidth
              />
              <TextField
                autoFocus
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
              <Button onClick={this.handleClose} color="primary">
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