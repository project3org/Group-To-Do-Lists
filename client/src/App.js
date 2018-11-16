// Import React and Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Local Dependencies
import { verifySession } from './redux/actions/actions';

// Import Components
import SignUpDialog from './components/Dialogs/SignUpDialog';
import SignInDialog from './components/Dialogs/SignInDialog';
import MenuDrawer from './components/MenuDrawer';
import ProfileDialog from './components/Dialogs/ProfileDialog';
import Navbar from './components/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer';
import CardContainer from './components/Cards/CardContainer';

// Alerts me to material-ui variants that are about to be depreciated
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  // Checks for user token on component mount
  componentDidMount() {
    this.props.verifySession();
  };

  // Renders Data to page
  render() {
    return (
        <div className="App">
          {/* Render Closed Dialogs and Drawers*/}
          <SignInDialog />
          <SignUpDialog />
          <MenuDrawer />
          <ProfileDialog />

          {/* Render Navbar */}
          <Navbar />

          {/* Render JumboTron */}
          <Jumbotron />

          {/* Main Content */}
          <CardContainer />

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