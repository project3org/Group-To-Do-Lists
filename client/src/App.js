// Import React and Dependencies
import React, { Component } from 'react';
import { Provider } from 'react-redux';

// Import Components
<<<<<<< HEAD
import store from '../redux/store';
import SignUp from '../components/dialogs/SignUp';
import SignIn from '../components/dialogs/SignIn';
import Navbar from '../components/Navbar';
import Jumbotron from '../components/Jumbotron';
import Footer from '../components/Footer';
=======
import store from './redux/store';
import SignUp from './components/dialogs/SignUp';
import SignIn from './components/dialogs/SignIn';
import MenuDrawer from './components/MenuDrawer';
import Navbar from './components/Navbar/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer/Footer';
>>>>>>> side drawer now opens. will continue on it later. moving on to testing ty's api routes.
import Tasks from './pages/Tasks';

// Alerts me to material-ui variants that are about to be depreciated
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  // Renders Data to page
  render() {
    return (
      <Provider store={store}>
        <div className="App">
<<<<<<< HEAD
          {/* Render Closed Dialogs With the AppBar for Sign In/Sign Up function*/}
=======
          {/* Render Closed Dialogs for Sign In/Sign Up function as well as closed side drawer for menu*/}
>>>>>>> side drawer now opens. will continue on it later. moving on to testing ty's api routes.
          <SignIn />
          <SignUp />
          <MenuDrawer />

          {/* I Pass in the Sign In/Sign Up dialogs thru the Navbar */}
          <Navbar />

          {/* Render JumboTron */}
          <Jumbotron />

          {/* Main Content */}
          <Tasks />

          {/* Footer */}
          <Footer />
        </div>
      </Provider>
    );
  }
}

// Exports App
export default App;