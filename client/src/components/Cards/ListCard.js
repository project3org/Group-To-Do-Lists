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
import { openCreateTask } from '../../redux/actions/userActions';

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

  // Handle Creating Task
  handleCreateTask = () => {
    this.props.openCreateTask(this.props.listId);
  };

  // Handle Deleting List
  handleDeleteList = () => {
    // Delete List from DB
    fetch(`api/lists/${this.props.listId}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(dbList => {
        // Then Delete List Association from User 'Lists' Array
        fetch(`api/account/user/${this.props.currentUser._id}/${this.props.listId}`, {
          method: 'POST'
        // Then Reload Window to reflect the changes.
        }).then(window.location.reload());
    });
  };

  // Render Component
  render () {
    return (
      <div className="ListCard">
        {/* Render List Card */}
        <Card className="text-center">
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
            </Typography>
            <Typography variant="h5" component="h2">
            {this.state.listName}
            </Typography>
            <Typography component="h6">
              <ul>
                {this.state.tasks.map(taskId => <Task key={taskId} taskId={taskId} listId={this.props.listId}/>)}
              </ul>
            </Typography>
          </CardContent>
          <CardActions>
            <Button color="secondary" size="small" onClick={this.handleDeleteList} style={{marginRigth: 'auto'}}>Delete List</Button>
            <Button color="primary" size="small" onClick={this.handleCreateTask} style={{marginLeft: 'auto'}}>Add Task</Button>
          </CardActions>
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