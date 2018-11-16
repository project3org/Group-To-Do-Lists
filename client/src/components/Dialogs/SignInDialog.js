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
import { signIn, closeDialogs } from '../../redux/actions/userActions';

// Creates Style for Error Messages
const errorStyle = {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    paddingTop: 10
}

// Create Component
class SignInDialog extends React.Component {
    // Handles Closing Dialog
    handleDialogClose = () =>{
        // Envokes closeDialogs
        this.props.closeDialogs();
    };

    // Handle User Sign In
    handleUserSignIn = (e) => {
        // Prevent form submittion from refreshing page
        e.preventDefault();

        // Target user information
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        // Run signIn function with arguments email and password
        this.props.signIn(email, password);
    };

    // Renders Component
    render() {
        return (
            <div>
                {/* Creates Sign In Dialog */}
                <Dialog
                open={this.props.openSignInDialog}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
                >
                    <form onSubmit={this.handleUserSignIn}>
                        <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Please enter your user email and password.<br />
                            If you do not have an account please sign up.<br /><br />
                            </DialogContentText>
                            <TextField
                            autoFocus
                            margin="dense"
                            id="signInEmail"
                            label="Email Address"
                            type="email"
                            fullWidth
                            autoComplete='no'
                            />
                            <TextField
                            margin="dense"
                            id="signInPassword"
                            label="Password"
                            type="password"
                            fullWidth
                            autoComplete='no'
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
                            Sign In
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    };
};

// Create PropTypes
SignInDialog.propTypes = {
    signIn: PropTypes.func.isRequired,
    closeDialogs: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    openSignInDialog: PropTypes.bool
}
  
// Map State to Props
const mapStateToProps = state => ({
    errorMessage: state.user.errorMessage,
    openSignInDialog: state.user.openSignInDialog,
});
  
// Export Component
export default connect(mapStateToProps, { signIn, closeDialogs })(SignInDialog);