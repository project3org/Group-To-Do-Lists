// Import dependencies
import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ListCard from './ListCard';
import "./Container.css";

// Import Local dependencies
import { openSignUp, openCreateList } from '../../redux/actions/actions';
import CreateListDialog from '../Dialogs/CreateList';

// Create Component
class CardContainer extends Component {
  // Create State
  state = {
    lists: [],
    listTasks: []
  };

  // Function to get user lists
  getUserLists = () => {
    // Get User Information and return it in json form
    fetch(`/api/account/user/${this.props.currentUser._id}`).then(res => res.json()).then(
      (userBody) => {
        // Target user lists from user data
        const userLists = userBody.data[0].lists;

        // Set state lists to userLists
        this.setState({
          lists: userLists
        });
      }
    )
  };

  // Function to create list button if user has no available lists
  noLists = () => {
    // If user has no lists, return this div
    if(this.state.lists.length === 0) {
      return (
        <div id="ParentCardContainer">
          <Card className="text-center">
            <CardContent className="text-center">
            <h1>Your Lists</h1><br />
            <h3>Your lists would be here, but it seems you don't have any. <br />
            Would you like to create one?</h3><br />
            <button className="btn peach-gradient center" onClick={this.props.openCreateList}>Create List</button>
            </CardContent>
          </Card>
        </div>
      );
    } else {
      return null;
    }
  };

  // Refreshes component to show change
  handleCreateList = (arr) => {
    this.setState({lists: arr});

    // Reruns this function to make sure it gets rid of header
    this.noLists();
  };

  // Handles deleting list
  handleDeleteList = (listId) => {
    // Function for removing item from array
    function arrayRemove(arr, value) {
      return arr.filter(function(ele){
        return ele !== value;
      });
    };

    // Delete List from DB
    fetch(`api/lists/${listId}`, {
      method: 'DELETE'
    }).then(res => res.json())
    .then(dbList => {
        // Then Delete List Association from User 'Lists' Array
        fetch(`api/account/user/${this.props.currentUser._id}/${listId}`, {
          method: 'POST'
        }).then(
          // Remove current list from lists state array
          this.setState({
            list: arrayRemove(this.state.lists, listId)
          })
        );
    });
  };

  handleCreateTask = (arr) => {
    this.setState({listTasks: arr});
  };

  // Render Component
  render() {
    // If Signed Out Component
    if(!this.props.signedIn) {
      return (
        <div id="ParentCardContainer">
              <Card className="text-center">
                <CardContent className="text-center">
                  <h1>Your Lists</h1><br />
                  <h3>Your lists will be here! But it looks like you arent signed in at the moment.</h3>
                  <h3>Please sign in to view your lists.</h3>
                  <p>Don't have an account? No problem. Just click the button below to sign up and get started!</p>
                  <a className="btn peach-gradient center" href="#!" onClick={this.props.openSignUp}><i className="fa fa-clone left"></i>Get Started!</a>
                </CardContent>
              </Card>
        </div>
      );
      // If Signed In Component
    } else {
      return (
        <div id="ParentCardContainer">
          {/* Renders create list dialog */}
          <CreateListDialog handleCreateList={this.handleCreateList} />

          {/* Renders Card for each list */}
          {this.getUserLists()}
          <div id="ChildCardContainer">
            {this.noLists()}
            {this.state.lists.map(listId => <ListCard key={listId} listId={listId} currentUser={this.props.currentUser} handleDeleteList={this.handleDeleteList} tasks={this.state.listTasks} />)}
          </div>
        </div>
      );
    }
  };
};

// Create PropTypes
CardContainer.propTypes = {
  openSignUp: PropTypes.func.isRequired,
  openCreateList: PropTypes.func.isRequired,
  signedIn: PropTypes.bool.isRequired,
  currentUser: PropTypes.object.isRequired
}

// Maps States to Component Props
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  currentUser: state.user.currentUser
});

// Export Component
export default connect(mapStateToProps, { openSignUp, openCreateList })(CardContainer);