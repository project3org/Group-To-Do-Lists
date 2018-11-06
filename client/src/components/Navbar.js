// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Import Local Dependencies
import { signOut, openSignIn, openSignUp, verifySession } from '../actions/userActions';

// Create Custom Styles
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

// Create Componenet
class Navbar extends React.Component {
  state = {
    signedInOrOutButton: ''
  };

  // Checks for user token on component mount
  componentDidMount() {
    // Verifies user session
    this.props.verifySession();
;
    // If signed in, set button to say 'Sign Out'
    if(this.props.signedIn) {
      this.setState({signedInOrOutButton: 'Sign Out'}); 
    } else {
      // Else, set button to say 'Sign In'
      this.setState({signedInOrOutButton: 'Sign In'});
    };

  };

  // Opens Sign In Dialog
  openSignInDialog = () => {
    this.props.openSignIn();
  };

  // Changes Button and sign in states from 'Signed In' to 'Signed Out' and Vice Versa
  signInOrOut = (string) => {
    if(this.props.signedIn) {
      this.props.signOut();
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
    if(this.props.signedIn) {
      return this.handleUserSignOut();
    } else {
      return this.openSignInDialog();
    }
  };

  // User Sign Out
  handleUserSignOut = () =>{
    this.props.signOut();
  };

  // Renders Component to DOM
  render() {
    return (
      <div className='root' style={styles.root}>
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
            <Button color="inherit" onClick={this.props.openSignUp}>Sign Up</Button>

            {/* Icon for a menu button */}
            <IconButton className='menuButton' style={styles.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </div>
    );
  };
};

// Create PropTypes
Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  openSignIn: PropTypes.func.isRequired,
  openSignUp: PropTypes.func.isRequired,
  verifySession: PropTypes.func.isRequired,
  signedIn: PropTypes.bool
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
});

// Export Component
export default connect(mapStateToProps, { signOut, openSignIn, openSignUp, verifySession })(Navbar);