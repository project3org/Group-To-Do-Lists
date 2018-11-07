// Import react and dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

// Import Local Dependencies
import { closeDialogs } from '../redux/actions/userActions';

// Create custome styles
const styles = {
  list: {
    width: 250,
  }
};

// Create Component
class MenuDrawer extends React.Component {
  // Render Component   
  render() {

    // Create Side Drawer components
    const sideList = (
      <div>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text} onClick={this.props.closeDialogs}>
              {/* <ListItemIcon>{}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              {/* <ListItemIcon>{}</ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
        <Drawer anchor="right" open={this.props.openDrawer} onClose={this.props.closeDialogs}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.props.closeDialogs}
            onKeyDown={this.props.closeDialogs}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

// Create PropTypes
MenuDrawer.propTypes = {
    closeDialogs: PropTypes.func.isRequired,
    openDrawer: PropTypes.bool.isRequired
};

// Maps States to Component Props
const mapStateToProps = state => ({
    openDrawer: state.user.openDrawer
});

// Export Component
export default connect(mapStateToProps, { closeDialogs })(MenuDrawer);