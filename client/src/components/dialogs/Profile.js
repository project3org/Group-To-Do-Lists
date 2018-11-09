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
import { closeDialogs } from '../../redux/actions/userActions';

// Creates Style for Error Messages
const errorStyle = {
    color: 'red',
    fontSize: 13,
    textAlign: 'right',
    paddingTop: 10
}

// Create Component
class ProfileDialog extends React.Component {
    // Renders Component
    render() {
        return (
            <div>
                {/* Creates User Profile Dialog */}
                <Dialog
                open={this.props.openProfileDialog}
                onClose={this.props.closeDialogs}
                aria-labelledby="form-dialog-title"
                >
                        <DialogTitle id="form-dialog-title">Your Profile</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Update or delete your profile information.<br /><br />
                            </DialogContentText>
                            <DialogContentText style={errorStyle}>
                            {this.props.errorMessage}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button margin-right="auto" color="secondary">
                            Delete Profile
                            </Button>
                            <Button onClick={this.props.closeDialogs} color="primary">
                            Close
                            </Button>
                            <Button type="Submit" color="primary">
                            Edit
                            </Button>
                        </DialogActions>
                </Dialog>
            </div>
        );
    };
};

// Create PropTypes
ProfileDialog.propTypes = {
    closeDialogs: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    openProfileDialog: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
}
  
// Map State to Props
const mapStateToProps = state => ({
    errorMessage: state.user.errorMessage,
    openProfileDialog: state.user.openProfileDialog,
    currentUser: state.user.currentUser
});
  
// Export Component
export default connect(mapStateToProps, { closeDialogs })(ProfileDialog);