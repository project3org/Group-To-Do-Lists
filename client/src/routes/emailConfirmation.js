// Import React
import React, { Component } from 'react';
// Import Dependencies
import toastr from 'toastr';
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

          // Send toastr message to user

          // Creates toastr options
          toastr.options = {
            "closeButton": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };

          // Sends toastr success message to user
          toastr.success("Redirecting to homepage... You may now sign in!", `${json.message}`);

          // Function for handling page redirect
          const redirect = () => {
            window.location.href = "/"
          };

          // Redirect user back to homepage after a moment so they can read toastr message
          setTimeout(redirect, 3000);

        } else {
          // Else log out error message
          this.setState({
            serverMessage: json.message
          });

          // Send toastr message to user
          // Creates toastr options
          toastr.options = {
            "closeButton": true,
            "positionClass": "toast-top-right",
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          };

          // Sends toastr error message to user
          toastr.error("Sounds like you may need a new token.", `${json.message}`);
        };
      });
  };

  // Renders Data to page
  render() {
    return (
      <div className="App">
        {/* I Pass in the Sign In/Sign Up dialogs thru the Navbar */}
        <Navbar />

        {/* Main Content */}
        <MainBody verify={this.verifyEmail}/>

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

// Exports App
export default App;