// Import Dependencies
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

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
  async componentDidMount() {
    await fetch(`api/tasks/${this.props.taskId}`)
      .then(res => res.json())
      .then(dbTask => {
          if(dbTask){
              this.setState({
                taskId: dbTask._id,
                taskName: dbTask.name,
                taskDescription: dbTask.description,
                isCompleted: dbTask.isCompleted
            });
          }
      });
  };

  handleDeleteTask = () => {
    this.props.handleDeleteTask(this.props.taskId)
  };

  // Handle Completing Task   
  handleCompleteTask = () => {
    console.log('Task Completed!');
    console.log(this.state.taskId);
  }; 

  // Render Component   
  render () {
    return (
        <li className="list-group-item">
            <Button color="secondary" style={{marginLeft: 'auto'}} size="small"onClick={this.handleDeleteTask}>x</Button>
            {this.state.taskName}
            <Button color="primary" style={{marginLeft: 'auto'}} size="small" onClick={this.handleCompleteTask}>Complete</Button>
        </li>
    );
  };
};

// Export Component
export default TaskCard;