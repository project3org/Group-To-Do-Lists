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
        });
      });

    await fetch(`/api/tasks/all/${this.props.listId}`)
      .then(res => res.json())
      .then((data) => {
        this.setState({
          tasks: data,
        });
      });
  };

  // Handle Adding Task
  handleAddTask = () => {
    console.log('Add Task Here');
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
          <Button color="primary" size="small" onClick={this.handleAddTask}>Add Task</Button>
        </CardActions>
      </Card>
    );
  };
};

// Export Component
export default ListCard;