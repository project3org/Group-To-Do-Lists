// Import React
import React, { Component } from 'react';
// Import Components
import Navbar from './components/Navbar/Navbar';
import Jumbotron from './components/Jumbotron';
import Footer from './components/Footer/Footer';
import Tasks from './pages/Tasks';

class App extends Component {
  // Set States
  constructor(props) {
    super(props);
    this.state = {
      signInButtonMessage: 'Sign In'
    };    
  }

  // Renders Data to page
  render() {
    return (
      <div className="App">
        {/* I Pass in the Sign In/Sign Up dialogs thru the Navbar */}
        <Navbar />

        <Jumbotron />

        {/* Main Content */}
        <Tasks />

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

// Exports App
export default App;