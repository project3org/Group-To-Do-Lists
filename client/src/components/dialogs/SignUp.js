// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

// Import local dependencies
import { closeDialogs } from '../../actions/userActions';

// Creates Style for Error Messages
const errorStyle = {
  color: 'red',
  fontSize: 13,
  textAlign: 'right',
  paddingTop: 10
};

// Exports Component
class SignUpDialog extends React.Component {
  // Handle Submit New User
  handleUserSubmit = () => {
    // Target input fields
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('emailSignUp').value;
    const password = document.getElementById('passwordSignUp').value;
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

          // Display a success message telling user to check their email
          // Creates toastr options
          toastr.options = {
            "closeButton": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };

          // Sends toastr success message to user
          toastr.success("Please follow the link sent to your email.", "Account successfully created!");
        } else {
        // Else log out error message
          this.setState({
            signUpError: json.message
          });
        };
    });
  };

  // Renders Component
  render() {
    return (
      <div>
        {/* Creates Sign Up Dialog */}
        <Dialog
          open={this.props.openSignUpDialog}
          onClose={this.props.closeDialogs}
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
            id="emailSignUp"
            label="Email Address"
            type="email"
            fullWidth
            required
            />
            <TextField
            margin="dense"
            id="passwordSignUp"
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
            {this.props.errorMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.closeDialogs} color="primary">
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

// Create PropTypes
SignUpDialog.propTypes = {
  closeDialogs: PropTypes.func.isRequired,
  openSignUpDialog: PropTypes.bool,
  errorMessage: PropTypes.string,
}

// Map State to Props
const mapStateToProps = state => ({
  openSignUpDialog: state.user.openSignUpDialog,
  errorMessage: state.user.errorMessage,
});

// Export Component
export default connect(mapStateToProps, { closeDialogs })(SignUpDialog);