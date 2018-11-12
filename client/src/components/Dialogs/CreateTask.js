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
class CreateTaskDialog extends React.Component {
    // Handle Creating List
    handleCreateList = () => {
        const taskName = document.getElementById("taskName").value;
        const taskDescritption = document.getElementById("taskDescription").value;
        const currentUserId = this.props.currentUser._id
        console.log(currentUserId);

        // fetch(`/api/lists/${currentUserId}`, {
        //     method: "POST",
        //     headers: {
        //       'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         creatorId: currentUserId,
        //         name: listName
        //     })
        // }).then(() => {
        //     window.location.reload();
        // });
    };

    // Renders Component
    render() {
        return (
            <div>
                {/* Creates User Profile Dialog */}
                <Dialog
                open={this.props.openCreateTaskDialog}
                onClose={this.props.closeDialogs}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please provide a task and a task description.<br />
                        </DialogContentText>
                    </DialogContent>
                    <DialogContent>
                        <TextField 
                            autoFocus
                            margin="dense"
                            id="taskName"
                            label="Task Name"
                            type="name"
                            fullWidth
                            autoComplete='no'
                        />
                        <TextField 
                            margin="dense"
                            id="taskDescription"
                            label="Task Description"
                            type="name"
                            fullWidth
                            autoComplete='no'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.closeDialogs} color="primary">
                        Close
                        </Button>
                        <Button onClick={this.handleCreateTask} color="primary">
                        Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
};

// Create PropTypes
CreateTaskDialog.propTypes = {
    closeDialogs: PropTypes.func.isRequired,
    errorMessage: PropTypes.string.isRequired,
    openCreateTaskDialog: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
};
  
// Map State to Props
const mapStateToProps = state => ({
    errorMessage: state.user.errorMessage,
    openCreateTaskDialog: state.user.openCreateTaskDialog,
    currentUser: state.user.currentUser
});
  
// Export Component
export default connect(mapStateToProps, { closeDialogs })(CreateTaskDialog);