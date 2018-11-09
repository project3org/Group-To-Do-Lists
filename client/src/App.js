// Import React and Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Local Dependencies
import { verifySession } from './redux/actions/userActions';

// Import Components
import SignUp from './components/dialogs/SignUp';
import SignIn from './components/dialogs/SignIn';
import MenuDrawer from './components/MenuDrawer';
import Profile from './components/dialogs/Profile';
import Navbar from './components/Navbar/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer/Footer';
import Tasks from './pages/Tasks';

// Alerts me to material-ui variants that are about to be depreciated
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  // Checks for user token on component mount
  async componentDidMount() {
    await this.props.verifySession();
  };

  // Renders Data to page
  render() {
    return (
        <div className="App">
          {/* Render Closed Dialogs for Sign In/Sign Up function as well as closed side drawer for menu*/}
          <SignIn />
          <SignUp />
          <MenuDrawer />
          <Profile />

          {/* Render Navbar */}
          <Navbar />

          {/* Render JumboTron */}
          <Jumbotron />

          {/* Main Content */}
          <Tasks />

          {/* Render Footer */}
          <Footer />
        </div>
    );
  }
};

// Create PropTypes
App.propTypes = {
  verifySession: PropTypes.func.isRequired
};

// Exports App
export default connect(null, { verifySession })(App);