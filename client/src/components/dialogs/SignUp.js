import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// Creates Style for Error Messages
const errorStyle = {
  color: 'red',
  fontSize: 13,
  textAlign: 'right',
  paddingTop: 10
};

// Exports Component
export default class FormDialog extends React.Component {
  // Creates States
  state = {
    signedIn: false,
    signUpError: '',
    token: null
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
            signUpError: json.message,
            signedUp: true,
            signedIn: true
          });
          // Tells the user Hello in console
          console.log(`Hello ${firstName}!`);

          // Closes the Dialog after successful user submittion
          this.props.close();
        } else {
        // Else log out error message
          this.setState({
            signUpError: json.message
          });
        }
    });
  };

  // Renders Component
  render() {
    return (
      <div>
        {/* Creates Sign Up Dialog */}
        <Dialog
          open={this.props.open}
          onClose={this.props.close}
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
            <Button onClick={this.props.close} color="primary">
            Cancel
            </Button>
            <Button onClick={this.handleUserSubmit} color="primary">
            Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };
};