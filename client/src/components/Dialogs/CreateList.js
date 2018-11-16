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
};

// Create Component
class CreateListDialog extends React.Component {
    // Create State
    state = {
        errorMessage: ''
    };

    // Handle Creating List
    handleCreateList = (e) => {
        // Prevent page from reloading by default
        e.preventDefault();

        // Target List Name and Current User Id
        const listName = document.getElementById("listName").value
        const currentUserId = this.props.currentUser._id

        // POST request to server
        fetch(`/api/lists/${currentUserId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                creatorId: currentUserId,
                name: listName
            })
        }).then(res => res.json())
        .then(() => {
            // If Errors, display error
            if(!listName.length) {
                this.setState({
                    errorMessage: 'First name cannot be blank'
                })
            } else {
                // Else clear error message
                this.setState({
                    errorMessage: ''
                })

                // Reload page to show changes
                window.location.reload();
            };
        });
    };

    // Handle Dialog Close
    handleDialogClose = () => {
        this.setState({
            errorMessage: ''
        });

        this.props.closeDialogs()
    };

    // Renders Component
    render() {
        return (
            <div>
                {/* Creates User Profile Dialog */}
                <Dialog
                open={this.props.openCreateListDialog}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create List</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        List Name<br />
                        </DialogContentText>
                    </DialogContent>
                    <form onSubmit={this.handleCreateList}>
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
                        <DialogContent style={errorStyle}>
                            {this.state.errorMessage}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleDialogClose} color="primary">
                            Close
                            </Button>
                            <Button type="Submit" color="primary">
                            Create
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        );
    };
};

// Create PropTypes
CreateListDialog.propTypes = {
    closeDialogs: PropTypes.func.isRequired,
    openCreateListDialog: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
};
  
// Map State to Props
const mapStateToProps = state => ({
    openCreateListDialog: state.user.openCreateListDialog,
    currentUser: state.user.currentUser
});
  
// Export Component
export default connect(mapStateToProps, { closeDialogs })(CreateListDialog);