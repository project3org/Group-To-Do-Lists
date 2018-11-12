// Import Dependencies
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Create Component
class TaskCard extends Component {
  // Create State 
  state = {
      taskId: '',
      taskName: '',
      taskDescription: '',
      isCompleted: false
  };

  // Get list information on component mount
  async componentWillMount() {
    await fetch(`api/tasks/${this.props.taskId}`)
      .then(res => res.json())
      .then(dbTask => {
          if(dbTask){
              this.setState({
                taskId: dbTask._id,
                taskName: dbTask.name,
                taskDescription: dbTask.description
            });
          }
      });
  };

  // Handle Completing Task   
  handleCompleteTask = () => {
    console.log('Task Completed!');
  }; 

  // Handle Deleting Task   
  handleDeleteTask = () => {
    // Delete Task from DB
    fetch(`api/tasks/${this.state.taskId}`, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(dbTask => {
        // Then Delete Task Association from List 'Task' Array
        fetch(`api/lists/${this.props.listId}/${this.props.taskId}`, {
            method: "POST"
        // Then reload window to reflect changes.
        }).then(window.location.reload());
    });
  }; 

  // Render Component   
  render () {
    return (
        <li className="list-group-item">
            {this.state.taskName}
            <Button color="secondary" style={{marginLeft: 'auto'}} size="small"onClick={this.handleDeleteTask}>Delete Task</Button>
            <Button color="primary" style={{marginLeft: 'auto'}} size="small" onClick={this.handleCompleteTask}>Task Complete</Button>
        </li>
    );
  };
};

// Export Component
export default TaskCard;