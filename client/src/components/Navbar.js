import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// Dependencies for menu icon, if we decide to keep it.
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import SignUp from './dialogs/SignUp';
import SignIn from './dialogs/SignIn';
import { getFromStorage } from '../utils/storage';

const styles = {
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: '#323741',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export default class FormDialog extends React.Component {
  state = {
    openSignIn: false,
    openSignUp: false,
    signedIn: false,
    signedInOrOutButton: 'Sign In'
  };

  // Checks for user token on component load
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
        // Set Button to be 'Sign Out'
        this.setState({
        token,
        signedIn: true,
        signedInOrOutButton: 'Sign Out'
        });
      };
      });
    } else {
      // Else set state signed in to false and set button to be 'Sign In'
      this.setState({
        signedIn: false,
        signedInOrOutButton: 'Sign In'
      });
    };
  };

  // Opens Sign In Dialog
  openSignInDialog = () => {
    this.setState({openSignIn: true});
  };

  // Opens Sign Up Dialog
  openSignUpDialog = () => {
    this.setState({openSignUp: true});
  };

  // Closes Dialogs
  closeDialog = () => {
    this.setState({
      openSignIn: false,
      openSignUp: false
    });
  };

  // Changes Button and sign in states from 'Signed In' to 'Signed Out' and Vice Versa
  signInOrOut = (string) => {
    if(this.state.signedIn) {
      this.setState({
        signedIn: false
      });
    } else {
      this.setState({
        signedIn: true,
        signedInOrOutButton: string
      });
    };
  };

  // Switches Functionality of Sign In/Sign Out Button
  // I tried to combine this with the above function, but it wouldn't work properly.
  signInSignOutButton = () => {
    if(this.state.signedIn) {
      return this.handleUserSignOut();
    } else {
      return this.openSignInDialog();
    }
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
            signedIn: false,
            signedInOrOutButton: 'Sign In'
          });
        };
      });
    } else {
      this.setState({
        signedIn: false
      }); 
    };
  };

  // Renders Component to DOM
  render() {
    return (
      <div className='root' style={styles.root}>
        {/* Render Closed Dialogs With the AppBar for Sign In/Sign Up function*/}
        <SignIn open={this.state.openSignIn} close={this.closeDialog} button={this.signInOrOut}/>
        <SignUp open={this.state.openSignUp} close={this.closeDialog}/>

        {/* Render AppBar */}
        <AppBar position="static" className='appBar' style={styles.appBar}>
          <Toolbar>
            {/* App Title */}
            <Typography variant="display1" color="inherit" className='grow' style={styles.grow}>
              Gratify
            </Typography>

            {/* Sign In/Sign Out Button */}
            <Button color="inherit" onClick={this.signInSignOutButton}>{this.state.signedInOrOutButton}</Button>

            {/* Sign Up Button */}
            <Button color="inherit" onClick={this.openSignUpDialog}>Sign Up</Button>

            {/* Icon for a menu button in case we would like to add one later */}
            {/* <IconButton className='menuButton' style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  };
};