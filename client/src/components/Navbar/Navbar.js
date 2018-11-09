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
import { signOut, openSignIn, openSignUp, openMenuDrawer } from '../../redux/actions/userActions';

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
    buttonTitle: ''
  };

  // Checks for user token on component mount
  componentDidMount() {
    console.log(this.props.currentUser);
  };

  handleDrawerOpen = () => {
    this.props.openMenuDrawer();
  };

  // Renders Component to DOM
  render() {
    if(!this.props.signedIn) {
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
              <Button color="inherit" onClick={this.props.openSignIn}>Sign In</Button>

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
    } else {
      return (
        <div className='root' style={styles.root}>
          {/* Render AppBar */}
          <AppBar position="static" className='appBar' style={styles.appBar}>
            <Toolbar>
              {/* App Title */}
              <Typography variant="h3" color="inherit" className='grow' style={styles.grow}>
                Gratify
              </Typography>

              {/* Sign Out Button */}
              <Button color="inherit" onClick={this.props.signOut}>Sign Out</Button>

              {/* Icon for a menu button */}
              <IconButton onClick={this.handleDrawerOpen}className='menuButton' style={styles.menuButton} color="inherit" aria-label="Menu" >
                <MenuIcon/>
              </IconButton>
            </Toolbar>
          </AppBar>
        </div>
      );
    }
  };
};

// Create PropTypes
Navbar.propTypes = {
  signOut: PropTypes.func.isRequired,
  openSignIn: PropTypes.func.isRequired,
  openSignUp: PropTypes.func.isRequired,
  openMenuDrawer: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
  openDrawer: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  openDrawer: state.user.openDrawer,
  currentUser: state.user.currentUser
});

// Export Component
export default connect(mapStateToProps, { signOut, openSignIn, openSignUp, openMenuDrawer })(Navbar);