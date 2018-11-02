import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import SignUp from './dialogs/SignUp';
import SignIn from './dialogs/SignIn';

const styles = {
  root: {
    flexGrow: 1,
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
    signedInOrOutButton: ''
  };

  openSignInDialog = () => {
    this.setState({openSignIn: true});
  };

  openSignUpDialog = () => {
    this.setState({openSignUp: true});
  };

  closeDialog = () => {
    this.setState({
      openSignIn: false,
      openSignUp: false
    });
  };

  signInOrOut = (string) => {
    this.setState({
      signedInOrOutButton: string
    });
  };

  render() {
    return (
      <div className='root' style={styles.root}>
        {/* Render Closed Dialogs With the AppBar for Sign In/Sign Up function*/}
        <SignIn open={this.state.openSignIn} close={this.closeDialog} signInButton={this.signInOrOut}/>
        <SignUp open={this.state.openSignUp} close={this.closeDialog}/>

        {/* Render AppBar */}
        <AppBar position="static">
          <Toolbar>
            <IconButton className='menuButton' style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="display1" color="inherit" className='grow' style={styles.grow}>
              Task Master
            </Typography>
            {/* Sign In Button */}
            <Button color="inherit" onClick={this.openSignInDialog}>Sign In</Button>

            {/* Sign Up Button */}
            <Button color="inherit" onClick={this.openSignUpDialog}>Sign Up</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}