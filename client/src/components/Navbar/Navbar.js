// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// Import Local Dependencies
import { signOut, openSignIn, openSignUp, openMenuDrawer, verifySession } from '../../redux/actions/userActions';

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
  // Checks for user token on component mount
  componentWillMount() {
    // Verifies user session
    this.props.verifySession();
  };

  // Opens Sign In Dialog
  openSignInDialog = () => {
    this.props.openSignIn();
  };

  handleDrawerOpen = () => {
    this.props.openMenuDrawer();
  };

  // User Sign Out
  handleUserSignOut = () =>{
    // Set button to say 'Sign In'
    this.setState({buttonTitle: 'Sign In'});

    // Run signOut function
    this.props.signOut();
  };

  // Switches Functionality of Sign In/Sign Out Button
  signInSignOutButton = () => {
    // If user is signed in, button will sign them out
    if(this.props.signedIn) {
      return this.handleUserSignOut();
    // Else button will open sign in dialog
    } else {
      return this.openSignInDialog();
    }
  };

  // Renders Component to DOM
  render() {
    return (
      <div className='root' style={styles.root}>
        {/* Render AppBar */}
        <AppBar position="static" className='appBar' style={styles.appBar}>
          <Toolbar>
            {/* App Title */}
            <Typography variant="h3" color="inherit" className='grow' style={styles.grow}>
              Gratify
            </Typography>

            {/* Sign In/Sign Out Button */}
            <Button color="inherit" onClick={this.signInSignOutButton}>{this.props.buttonTitle}</Button>

            {/* Sign Up Button */}
            <Button color="inherit" onClick={this.props.openSignUp}>Sign Up</Button>

            {/* Icon for a menu button */}
            <IconButton onClick={this.handleDrawerOpen}className='menuButton' style={styles.menuButton} color="inherit" aria-label="Menu" >
              <MenuIcon/>
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
  openMenuDrawer: PropTypes.func.isRequired,
  verifySession: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  buttonTitle: state.user.buttonTitle,
  openDrawer: state.user.openDrawer,
  currentUser: state.user.currentUser
});

// Export Component
export default connect(mapStateToProps, { signOut, openSignIn, openSignUp, openMenuDrawer, verifySession })(Navbar);