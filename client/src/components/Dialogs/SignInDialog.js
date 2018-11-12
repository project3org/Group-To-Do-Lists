import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { setInStorage } from '../../utils/storage';

// Creates Style for Error Messages
const errorStyle = {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    paddingTop: 10
}

// Exports Component
export default class FormDialog extends React.Component {
    // Creates State
    constructor(props) {
        super(props);
    
        this.state = {
            signedIn: false,
            signInError: '',
            token: null
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
            setInStorage('the_main_app', { token: json.token, expires: json.expires });

            // Set states
            this.setState({
            signInError: '',
            token: json.token,
            signedIn: true
            });

            // This is to target the signed in user's info for later use
            const user = json.userData
            console.log(`Hello ${user.firstName}!`);

            // Changes Button From 'Sign In' to 'Sign Out'
            this.props.button('Sign Out');

            // Closes Dialog After Successful Sign In
            this.props.close();
        } else {
        // Else log out Server error message.
            this.setState({
            signInError: json.message
            });
        
        }});
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
                            autoComplete='no'
                            onChange={e => this.handleChangePassword(e)}
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