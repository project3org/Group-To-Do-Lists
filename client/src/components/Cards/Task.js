import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class TaskCard extends Component {
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

  handleCompleteTask = () => {
    console.log('Task Completed!');
  }; 

  handleDeleteTask = () => {
    console.log('Task Deleted'); 
    console.log(this.state.taskId);
    
    fetch(`api/tasks/${this.state.taskId}`, {
        method: 'DELETE'
    }).then(res => res.json())
    .then(dbTask => {
        console.log(`${dbTask.name} deleted.`);
    });
  }; 

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

export default TaskCard;