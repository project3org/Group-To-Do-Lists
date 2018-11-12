// Import React
import React, { Component } from 'react';
<<<<<<< HEAD
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Local Dependencies
import { verifySession } from './redux/actions/userActions';

// Import Components
import SignUpDialog from './components/Dialogs/SignUpDialog';
import SignInDialog from './components/Dialogs/SignInDialog';
import MenuDrawer from './components/MenuDrawer';
import ProfileDialog from './components/Dialogs/ProfileDialog';
import CreateListDialog from './components/Dialogs/CreateList';
import CreateTaskDialog from './components/Dialogs/CreateTask';
import Navbar from './components/Navbar';
=======
// Import Components
import Navbar from './components/Navbar/Navbar';
>>>>>>> master
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer';
import CardContainer from './components/Cards/CardContainer';

class App extends Component {
<<<<<<< HEAD
  // Checks for user token on component mount
  async componentDidMount() {
    await this.props.verifySession();
  };
=======
  // Set States
  constructor(props) {
    super(props);
    this.state = {
      signInButtonMessage: 'Sign In'
    };    
  }
>>>>>>> master

  // Renders Data to page
  render() {
    return (
<<<<<<< HEAD
        <div className="App">
          {/* Render Closed Dialogs and Drawers*/}
          <SignInDialog />
          <SignUpDialog />
          <MenuDrawer />
          <ProfileDialog />
          <CreateListDialog />
          <CreateTaskDialog />

          {/* Render Navbar */}
          <Navbar />

          {/* Render JumboTron */}
          <Jumbotron />
=======
      <div className="App">
        {/* I Pass in the Sign In/Sign Up dialogs thru the Navbar */}
        <Navbar />

        <Jumbotron />
>>>>>>> master

          {/* Main Content */}
          <CardContainer />

<<<<<<< HEAD
          {/* Render Footer */}
          <Footer />
        </div>
=======
        {/* Footer */}
        <Footer />
      </div>
>>>>>>> master
    );
  }
};

// Create PropTypes
App.propTypes = {
  verifySession: PropTypes.func.isRequired
};

// Exports App
export default connect(null, { verifySession })(App);