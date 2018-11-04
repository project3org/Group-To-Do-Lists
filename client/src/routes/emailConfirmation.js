// Import React
import React, { Component } from 'react';
// Import Components
import Navbar from '../components/Navbar';
import MainBody from '../components/emailConfirmationMainBody';
import Footer from '../components/Footer';

class App extends Component {
  // Set States
  constructor(props) {
    super(props);
    this.state = {
      signInButtonMessage: 'Sign In',
      serverMessage: ''
    };    
  };

  verifyEmail = () => {
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
          console.log(this.state.serverMessage);
        } else {
        // Else log out error message
          this.setState({
            serverMessage: json.message
          });
          console.log(this.state.serverMessage);

          // Maybe add toastr here to tell users to contact a dev

          // ====================================================
        };
      });
      return window.location.href = "/";
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