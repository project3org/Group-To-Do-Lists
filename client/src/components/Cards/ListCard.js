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
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
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
  componentWillMount() {
    // Fetch list body using list id
    fetch(`/api/lists/${this.props.listId}`)
      .then(res => res.json())
      .then(listBody => {
        this.setState({
          listName: listBody.name,
          tasks: listBody.tasks
        })
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
          <Typography color="textSecondary" gutterBottom>
          Task list generated here
          </Typography>
          <Typography component="h6">
            <ul>
              {this.state.tasks.map(taskId => <TaskCard key={taskId} taskId={taskId} />)}
            </ul>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">List Info</Button>
        </CardActions>
      </Card>
    );
  };
};

// Export Component
export default ListCard;