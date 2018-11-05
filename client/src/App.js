// Import React
import React, { Component } from 'react';
// Import Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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

        {/* Main Content */}
        <h1>We puts the stuffs here!</h1>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

// Exports App
export default App;