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
import { closeDialogs, deleteUser } from '../../redux/actions/userActions';
import { getFromStorage } from '../../utils/storage';

// Creates Style for Error Messages
const styles = {
    errorStyle: {
        color: 'red',
        fontSize: 13,
        textAlign: 'right',
        paddingTop: 10
    },
    deleteProfBtnStyle: {
        marginRight: "auto"
    }
};

// Create Component
class ProfileDialog extends React.Component {
    // Handles Profile delete
    deleteProfile = () => {
        const confirmation = window.confirm("Are you sure you would like to delete your profile?");

        if(confirmation) {
            // Targets User Id
            const userId = this.props.currentUser._id

            // Deletes User
            this.props.deleteUser(userId);

            // Target user's current session
            const obj = getFromStorage('the_main_app');

            // Delete user's current session
            fetch(`/api/account/session/delete/${obj.token}`, {
                method: 'DELETE'
            }).then(res => res.json());
        } else {
            console.log('Whew, that was a close one.');
        };
    };

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
                        <DialogContentText style={styles.errorStyle}>
                        {this.props.errorMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        Ability to edit profile comming soon!
                    </DialogContent>
                    <DialogActions>
                        <Button style={styles.deleteProfBtnStyle} onClick={this.deleteProfile} color="secondary">
                        Delete Profile
                        </Button>
                        <Button onClick={this.props.closeDialogs} color="primary">
                        Close
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
    deleteUser: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    openProfileDialog: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
};
  
// Map State to Props
const mapStateToProps = state => ({
    errorMessage: state.user.errorMessage,
    openProfileDialog: state.user.openProfileDialog,
    currentUser: state.user.currentUser
});
  
// Export Component
export default connect(mapStateToProps, { closeDialogs, deleteUser })(ProfileDialog);