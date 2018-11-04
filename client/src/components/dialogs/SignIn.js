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
                open={this.props.open}
                onClose={this.props.close}
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
                    <Button onClick={this.props.close} color="primary">
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