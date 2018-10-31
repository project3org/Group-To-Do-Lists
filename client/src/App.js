// Import React
import React, { Component } from 'react';
// Import Components
import NavDialogs from './components/Dialogs';
// Import CSS
import './App.css';

class App extends Component {
  // Renders Data to page
  render() {
    return (
      <div className="App">
        {/* I Pass in the Sign In/Sign Up dialog, Which in turn passes in the Navbar. */}
        {/* This way, the Navbar can open the dialogs and have access to them in the future*/}
        <NavDialogs />

        <h1>We puts the stuffs here!</h1>
      </div>
    );
  }
}

// Exports App
export default App;