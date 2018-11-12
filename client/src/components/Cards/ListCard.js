// Import Dependencies
import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Import Local Dependencies
import TaskCard from './TaskCard';

// Create Styles
const styles = {
  card: {
    minWidth: 275,
  },
};

// Create Component
class ListCard extends Component {
  // Create States
  state = {
    listName: '',
    tasks: [],
  };

  // Get list information on component mount
  async componentWillMount() {
    // Fetch list body using list id
    await fetch(`/api/lists/${this.props.listId}`)
      .then(res => res.json())
      .then(listBody => {
        this.setState({
          listName: listBody.name,
          tasks: listBody.tasks
        });
      });
  };

  // Handle Adding Task
  handleAddTask = () => {
    console.log('Add Task Here');
  };

  // Handle Adding Task
  handleDeleteList = () => {
    console.log('Deleting list');

    fetch(`api/lists/${this.props.listId}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(dbList => {
        console.log(dbList);
        fetch(`api/account/user/${this.props.currentUser._id}/${this.props.listId}`, {
          method: 'POST'
        }).then(res => res.json())
        .then(window.location.reload());
    });
  };

  // Render Component
  render () {
    return (
      <Card className="text-center" style={styles.card}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
          </Typography>
          <Typography variant="h5" component="h2">
          {this.state.listName}
          </Typography>
          <Typography component="h6">
            <ul>
              {this.state.tasks.map(taskId => <TaskCard key={taskId} taskId={taskId} />)}
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary" size="small" onClick={this.handleDeleteList} style={{marginRigth: 'auto'}}>Delete List</Button>
          <Button color="primary" size="small" onClick={this.handleAddTask} style={{marginLeft: 'auto'}}>Add Task</Button>
        </CardActions>
      </Card>
    );
  };
};

// Export Component
export default ListCard;