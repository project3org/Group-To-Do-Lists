import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class TaskCard extends Component {
  state = {
      taskName: '',
      taskDescription: '',
      isCompleted: false
  };

  // Get list information on component mount
  componentWillMount() {
    fetch(`api/tasks/${this.props.taskId}`)
      .then(res => res.json())
      .then(dbTask => {
        this.setState({
            taskName: dbTask.name,
            taskDescription: dbTask.description
        });
      });
  };

  handleCompleteTask = () => {
    console.log('Task Completed!');
  }; 

  handleDeleteTask = () => {
    console.log('Task Deleted');    
  }; 

  render () {
    return (
      <Card className="text-center">
        <CardContent>
          <Typography variant="h5" component="h2">
            {this.state.taskName}
          </Typography>
          <Typography variant="h8" component="h6">
            {this.state.taskDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={this.handleCompleteTask}>Task Complete</Button>
          <Button size="small"onClick={this.handleDeleteTask}>Delete Task</Button>
        </CardActions>
      </Card>
    );
  };
};

export default TaskCard;