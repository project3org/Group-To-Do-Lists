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
import { signIn, closeDialogs } from '../../actions/userActions';

// Creates Style for Error Messages
const errorStyle = {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    paddingTop: 10
}

// Create Component
class SignInDialog extends React.Component {
    // Handle User Sign In
    handleUserSignIn = () => {
        // Target input fields
        const email = document.getElementsByClassName('emailSignIn')[0].value;
        const password = document.getElementsByClassName('passwordSignIn').value;

        console.log(email, password);

        // this.props.signIn(email, password);


        // this.saveToken();
    };

    // saveToken = () => {
    //     if(this.props.success) {

    //         // Close Dialog
    //         this.props.close();
    //     };
    // }

    // Renders Component
    render() {
        return (
            <div>
                {/* Creates Sign In Dialog */}
                <Dialog
                open={this.props.openSignInDialog}
                onClose={this.props.closeDialogs}
                aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Sign In</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please enter your user email and password.<br />
                    If you do not have an account please sign up.<br /><br />
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="emailSignIn"
                    label="Email Address"
                    type="email"
                    fullWidth
                    />
                    <TextField
                    margin="dense"
                    id="passwordSignIn"
                    label="Password"
                    type="password"
                    fullWidth
                    />
                    <DialogContentText style={errorStyle}>
                    {this.props.errorMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closeDialogs} color="primary">
                    Cancel
                    </Button>
                    <Button color="primary" onClick={this.handleUserSignIn}>
                    Sign In
                    </Button>
                </DialogActions>
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