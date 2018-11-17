// Import Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Import Local Dependencies
import Task from './Task';
import { openCreateTask } from '../../redux/actions/actions';

// Creates Style for Error Messages
const errorStyle = {
  color: 'red',
  fontSize: 13,
  textAlign: 'right',
  paddingTop: 10
};

// Create Component
class ListCard extends Component {
  // Create States
  state = {
    listName: '',
    tasks: [],
    errorMessage: ''
  };

  // Get list information on component mount
  componentDidMount() {
    // Fetch list body using list id
    fetch(`/api/lists/${this.props.listId}`)
      .then(res => res.json())
      .then(listBody => {
        this.setState({
          listName: listBody.name,
          tasks: listBody.tasks
        });
      });
  };

  // Handle Deleting List
  handleDeleteList = () => {
    this.props.handleDeleteList(this.props.listId);
  };

  // Handle Creating Task
  handleCreateTask = (event) => {
    // Prevent page reload on submit
    event.preventDefault();

    // Target List Id and Task Name
    const listId = this.props.listId;
    const taskName = document.getElementById(`${this.props.listId}-new-task`).value;

    // POST task name and description
    fetch(`/api/tasks/${listId}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        listId: listId,
        name: taskName,
        description: 'Default description'
      })
    }).then(res => res.json())
    .then((dbList) => {
      // If task name is blank, display this message
      if(!taskName.length) {
        this.setState({
          errorMessage: 'Task name cannot be blank'
        });
      // Else reset errorMessage (in case any occured) and update taskList
      } else {
        this.setState({
          errorMessage: '',
          tasks: dbList.tasks
        });

        // Reset the input the an empty string
        document.getElementById(`${this.props.listId}-new-task`).value = ''
      };
    });
  };
  
  // Handle Delete Task
  handleDeleteTask = (taskId) => {
    // Function for removing item from array
    function arrayRemove(arr, value) {
      return arr.filter(function(ele){
        return ele !== value;
      });
    };

    // Delete Task from DB
    fetch(`/api/tasks/${taskId}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(dbTask => {
        // Then Delete Task Association from List 'Task' Array
        fetch(`/api/lists/${this.props.listId}/${taskId}`, {
          method: "POST"
        // Then set state to reflect changes.
        }).then(
          this.setState({
            tasks: arrayRemove(this.state.tasks, taskId)
          })
        );
    });
  };

  // Render Component
  render () {
    return (
      <div className="ListCard">
        <Card className="text-center">
          <div className="InsideCardContent">
            <CardContent>
              <Typography variant="h5" component="h2">
              {this.state.listName}
              </Typography>
              <Typography component="h6">
                <ul>
                  {this.state.tasks.map(taskId => <Task key={taskId} taskId={taskId} listId={this.props.listId} handleDeleteTask={this.handleDeleteTask} />)}
                </ul>
              </Typography>
            </CardContent>
            <form onSubmit={this.handleCreateTask}>
              <CardActions>
                <input type="text" id={this.props.listId + '-new-task'} placeholder='Enter Task Here' size="50" style={{margin: "auto", width: "75%", border: 0, outline: 0, background: "transparent", borderBottom: "1px solid black"}} />
              </CardActions>
              <CardContent style={errorStyle}>
                {this.state.errorMessage}
              </CardContent>
              <CardActions>
                <Button color="secondary" size="small" onClick={this.handleDeleteList} style={{marginRigth: 'auto'}}>Delete List</Button>
                <Button color="primary" size="small" type="Submit" style={{marginLeft: 'auto'}}>Add Task</Button>
              </CardActions>
            </form>
          </div>
        </Card>
      </div>
    );
  };
};

// Create PropTypes
ListCard.propTypes = {
  openCreateTask: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  currentUser: state.user.currentUser
});

// Export Component
export default connect(mapStateToProps, { openCreateTask })(ListCard);