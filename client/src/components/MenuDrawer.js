// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Import Local Dependencies
import { signOut, openSignIn, openSignUp, openProfile, closeDialogs } from '../redux/actions/userActions';

// Create custome styles
const styles = {
  list: {
    width: 250,
  }
};

// Create Component
class MenuDrawer extends React.Component {
  // Function for handling the drawer buttons
  handleButtons = (key) => {
    // Switch case for each button
    switch (key) {
      // Your Lists button
      case 'Your Lists':
        console.log('Your Lists clicked, feature to come.');
        break;

      // Your Tasks Button
      case 'Your Tasks':
        console.log('Your Tasks clicked, feature to come.');
        break;
    
      // Create List Button
      case 'Create List':
        console.log('Create List clicked, feature to come.');
        break;

      // Your Profile Button
      case 'Your Profile':
        this.props.openProfile();
        break;

      // Sign Out Button
      case 'Sign Out':
        this.props.signOut();
        break;

      // Sign In Button 
      case 'Sign In':
        this.props.openSignIn();
        break;

      // Sign Up Button
      case 'Sign Up':
        this.props.openSignUp();
        break;

      // Close Drawer by Default
      default:
        this.props.closeDialogs();
        break;
    }
  };

  // Render Component   
  render() {
    // Create Buttons for Signed In users
    const signedInList = (
      <div>
        <List style={styles.list}>
          <ListItem>
            Menu
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Your Lists', 'Your Tasks', 'Create List'].map((text, index) => (
          <ListItem button key={text} onClick={() => this.handleButtons(text)}>
            <ListItemIcon>{
              index === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-9 8H3V9h9v2zm0-4H3V5h9v2z"/></svg>
                : (index === 1 ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>
                : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z"/></svg>
              )
            }</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Your Profile', 'Sign Out'].map((text, index) => (
          <ListItem button key={text} onClick={() => this.handleButtons(text)}>
            <ListItemIcon>{
              index === 0 ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
                : <svg width='24' height='24'></svg>
            }</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          ))}
        </List>
      </div>
    );

    // Create Buttons for Signed Out users
    const signedOutList = (
      <div>
        <List style={styles.list}>
          <ListItem>
            Menu
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Sign In', 'Sign Up'].map((text, index) => (
          <ListItem button key={text} onClick={() => this.handleButtons(text)}>
            <ListItemIcon>{
              // index === 0 ? <SignInIcon /> : <SignOutIcon />
            }</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
          ))}
        </List>
      </div>
    );

    if(this.props.signedIn) {
      return (
        <div>
          <Drawer anchor="right" open={this.props.openDrawer} onClose={this.props.closeDialogs}>
            <div
              tabIndex={0}
              role="button"
            >
              {signedInList}
            </div>
          </Drawer>
        </div>
      );
    } else {
      return (
        <div>
          <Drawer anchor="right" open={this.props.openDrawer} onClose={this.props.closeDialogs}>
            <div
              tabIndex={0}
              role="button"
            >
              {signedOutList}
            </div>
          </Drawer>
        </div>
      );
    }
  };
};

// Create PropTypes
MenuDrawer.propTypes = {
  signOut: PropTypes.func.isRequired,
  openSignIn: PropTypes.func.isRequired,
  openSignUp: PropTypes.func.isRequired,
  openProfile: PropTypes.func.isRequired,
  closeDialogs: PropTypes.func.isRequired,
  openDrawer: PropTypes.bool.isRequired
};

// Maps States to Component Props
const mapStateToProps = state => ({
  openDrawer: state.user.openDrawer,
  signedIn: state.user.signedIn
});

// Export Component
export default connect(mapStateToProps, { signOut, openSignIn, openSignUp, openProfile, closeDialogs })(MenuDrawer);