// Import React
import React, { Component } from 'react';
// Import Components
import Navbar from '../components/Navbar';
import MainBody from '../components/emailConfirmationMainBody';
import Footer from '../components/Footer';

// Create Component
class App extends Component {
  // Set States
  constructor(props) {
    super(props);
    this.state = {
      signInButtonMessage: 'Sign In',
      serverMessage: ''
    };    
  };

  // Function for verifing email in DB
  verifyEmail = () => {
    // Targeting email verification token
    // There's probably a better way to target this, but I'm in a rush so I'll look into it later.
    const token = window.location.pathname.substr(22);

    // Changes user isConfirmed index to true so users can sign in.
    fetch(`/api/account/confirmation/${token}`)
      .then(res => res.json())
      .then(json => {
        // If post was successful,
        if (json.success) {
          // log out success message
          this.setState({
            serverMessage: json.message
          });
        } else {
        // Else log out error message
          this.setState({
            serverMessage: json.message
          });
        };
      });
      
      return window.location.href = "/"
  };

  // Renders Data to page
  render() {
    return (
      <div className="App">
        {/* I Pass in the Sign In/Sign Up dialogs thru the Navbar */}
        <Navbar />

        {/* Main Content */}
        <MainBody verify={this.verifyEmail}/>
        {/* <h1>Email Verification</h1>
        <h2>Click this button to verify email</h2>
        <button onClick={this.buttonFunction}>Verify</button> */}

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

// Exports App
export default App;