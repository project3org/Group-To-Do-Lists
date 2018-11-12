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

// Create Component
class CreateListDialog extends React.Component {
    // Handle Creating List
    handleCreateList = () => {
        const listName = document.getElementById("listName").value
        const currentUserId = this.props.currentUser._id
        console.log(currentUserId);

        fetch(`/api/lists/${currentUserId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creatorId: currentUserId,
                name: listName
            })
        }).then(() => {
            window.location.reload();
        });
    };

    // Renders Component
    render() {
        return (
            <div>
                {/* Creates User Profile Dialog */}
                <Dialog
                open={this.props.openCreateListDialog}
                onClose={this.props.closeDialogs}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create List</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        List Name<br />
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            margin="dense"
                            id="listName"
                            label="List Name"
                            type="name"
                            fullWidth
                            autoComplete='no'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeDialogs} color="primary">
                        Close
                        </Button>
                        <Button onClick={this.handleCreateList} color="primary">
                        Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
};

// Create PropTypes
CreateListDialog.propTypes = {
    closeDialogs: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    openCreateListDialog: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
};
  
// Map State to Props
const mapStateToProps = state => ({
    errorMessage: state.user.errorMessage,
    openCreateListDialog: state.user.openCreateListDialog,
    currentUser: state.user.currentUser
});
  
// Export Component
export default connect(mapStateToProps, { closeDialogs })(CreateListDialog);