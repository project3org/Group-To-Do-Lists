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
class CreateTaskDialog extends React.Component {
    // Create State
    state = {
        errorMessage: ''
    };

    // Handle Creating List
    handleCreateTask = () => {
        // Target List Id and body information
        const listId = this.props.thisList
        const taskName = document.getElementById("taskName").value;
        const taskDescription = document.getElementById("taskDescription").value;

        // POST task name and description
        fetch(`/api/tasks/${listId}`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                listId: listId,
                name: taskName,
                description: taskDescription
            })
        }).then(res => res.json())
        .then(() => {
            // If task name is blank, display this message
            if(!taskName.length) {
                this.setState({
                    errorMessage: 'Task name cannot be blank'
                });

            // Else if task description is blank, display this message
            } else if (!taskDescription.length) {
                this.setState({
                    errorMessage: 'Description cannot be blank'
                });

            // Else reset errorMessage (in case any occured) and reload the window to show changes 
            } else {
                this.setState({
                    errorMessage: ''
                });

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
                open={this.props.openCreateTaskDialog}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create Task</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Please provide a task and a task description.<br />
                        </DialogContentText>
                    </DialogContent>
                    <form onSubmit={this.handleCreateTask}>
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
CreateTaskDialog.propTypes = {
    closeDialogs: PropTypes.func.isRequired,
    openCreateTaskDialog: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired,
    thisList: PropTypes.string.isRequired
};
  
// Map State to Props
const mapStateToProps = state => ({
    openCreateTaskDialog: state.user.openCreateTaskDialog,
    currentUser: state.user.currentUser,
    thisList: state.user.thisList
});
  
// Export Component
export default connect(mapStateToProps, { closeDialogs })(CreateTaskDialog);