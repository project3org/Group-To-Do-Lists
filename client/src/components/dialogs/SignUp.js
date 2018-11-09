// Ask TA about the auto fill with react

// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';

// Import local dependencies
import { signUp, closeDialogs } from '../../redux/actions/userActions';

// Creates Style for Error Messages
const errorStyle = {
  color: 'red',
  fontSize: 13,
  textAlign: 'right',
  paddingTop: 10
};

// Exports Component
class SignUpDialog extends React.Component {
  // Create Value States for Form
  constructor(props) {
    super(props);
    this.state = {
      firstNameValue: '',
      lastNameValue: '',
      emailValue: '',
      passwordValue: '',
      passwordVerificationValue: ''
    };
  };

  // Handles form value change for firstName input
  handleChangeFirstName = (event) => {
    this.setState({firstNameValue: event.target.value});
  };

  // Handles form value change for lastName input
  handleChangeLastName = (event) => {
    this.setState({lastNameValue: event.target.value});
  };

  // Handles form value change for email input
  handleChangeEmail = (event) => {
    this.setState({emailValue: event.target.value});
  };

  onBlur = (event) => {
    this.setState({emailValue: event.target.value});
    console.log(event.target)
  };

  // Handles form value change for password input
  handleChangePassword = (event) => {
    this.setState({passwordValue: event.target.value});
  };

  // Handles form value change for passwordVerification input
  handleChangePasswordVerification = (event) => {
    this.setState({passwordVerificationValue: event.target.value});
  }; 

  // Handles Closing Dialog
  handleDialogClose = () =>{
    // Sets value states back to empty strings
    this.setState({
        firstNameValue: '',
        lastNameValue: '',
        emailValue: '',
        passwordValue: '',
        passwordVerificationValue: ''
    });

    // Envokes closeDialogs
    this.props.closeDialogs();
  };

  // Handle Submit New User
  handleUserSubmit = (e) => {
    // Prevent default submit function
    e.preventDefault();

    // Target input fields
    const firstName = this.state.firstNameValue
    const lastName = this.state.lastNameValue
    const email = this.state.emailValue
    const password = this.state.passwordValue
    const passwordVerification = this.state.passwordVerificationValue

    // Rund signUp function with arguments firstName, lastName, email, password and passwordVerification
    this.props.signUp(firstName, lastName, email, password, passwordVerification);
    
    if (this.props.errorMessage === '') {
      this.setState({
        firstNameValue: '',
        lastNameValue: '',
        emailValue: '',
        passwordValue: '',
        passwordVerificationValue: ''
      });
    };
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
          <form onSubmit={this.handleUserSubmit}>
            <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Please enter the following information
              </DialogContentText>
              <TextField
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              autoComplete='no'
              onChange={e => this.handleChangeFirstName(e)}
              />
              <TextField
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              autoComplete='no'
              onChange={e => this.handleChangeLastName(e)}
              />
              <TextField
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              autoComplete='no'
              onChange={e => this.handleChangeEmail(e)}
              />
              <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              onChange={e => this.handleChangePassword(e)}
              />
              <TextField
              margin="dense"
              label="Password Verification"
              type="password"
              fullWidth
              onChange={e => this.handleChangePasswordVerification(e)}
              />
              <DialogContentText style={errorStyle}>
              {this.props.errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
              Cancel
              </Button>
              <Button type="Submit" color="primary">
              Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  };
};

// Create PropTypes
SignUpDialog.propTypes = {
  signUp: PropTypes.func.isRequired,
  closeDialogs: PropTypes.func.isRequired,
  openSignUpDialog: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
}

// Map State to Props
const mapStateToProps = state => ({
  openSignUpDialog: state.user.openSignUpDialog,
  errorMessage: state.user.errorMessage,
});

// Export Component
export default connect(mapStateToProps, { signUp, closeDialogs })(SignUpDialog);