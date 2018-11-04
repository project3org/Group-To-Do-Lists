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
      signInButtonMessage: 'Sign In',
      serverMessage: ''
    };    
  };

  // componentDidMount() {

  // };

  buttonFunction = () => {
    // There's probably a better way to target this, but I'm in a rush so I'll look into it later.
    // console.log(window.location.pathname.substr(26));

    const token = window.location.pathname.substr(26);

    // PUT user isConfirmed index to true so users can sign in.
    fetch(`api/account/confirmation/${token}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
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
        <h1>Email Verification</h1>
        <h2>Click this button to verify email</h2>
        <button onClick={this.buttonFunction}>Verify</button>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

// Exports App
export default App;