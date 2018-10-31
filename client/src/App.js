// Import React
import React, { Component } from 'react';
// Import Components
import NavDialogs from './components/Dialogs';
// Import CSS
import './App.css';

import {
  getFromStorage,
  setInStorage
} from '../src/utils/storage';

class App extends Component {
  // Have the Sign In/Sign Up stuff functioning, now just need to seperate into different components.

  constructor(props) {
    super(props);
    // Creates States
    this.state = {
      isLoading: true,
      isSignedIn: false,
      signUpError: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword: '',
    };

    // Binds Text Changes
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    this.onTextboxChangeSignUpFirstName = this.onTextboxChangeSignUpFirstName.bind(this);
    this.onTextboxChangeSignUpLastName = this.onTextboxChangeSignUpLastName.bind(this);

    // Binds methods
    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
  }

  // Checks for Token
  componentDidMount() {
    const token = getFromStorage('the_main_app');

    if (token) {
      // Verify token
      fetch(`/api/account/verify?token=${token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          };
        });
    } else {
      this.setState({
        isLoading: false,
      });
    };
  };

  // Sets State of Inputs to Input Text
  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  };

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  };

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  };

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  };

  onTextboxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  };

  onTextboxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  };

  // Handles Sign Up Function
  onSignUp() {
    // Targets States
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state;

    // Sets loading state to true
    this.setState({
      isLoading: true
    });

    // Posts new user info to DB
    fetch('api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,

            // Sets the input fields back to blank.
            // May not need once everthing is properly divided into different components.
            signUpEmail: '',
            signUpPassword: '',
            signUpFirstName: '',
            signUpLastName: ''
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          })
        }
      });
  };

  // Handles Sign In Method
  onSignIn() {

  }

  // Renders Data to page
  render() {
    // // Targets States
    // const {
    //   isLoading,
    //   token,
    //   isSignedIn,
    //   signUpError,
    //   signInError,
    //   signInEmail,
    //   signInPassword,
    //   signUpFirstName,
    //   signUpLastName,
    //   signUpEmail,
    //   signUpPassword
    // } = this.state;

    // // If loading, render loading dive
    // if (isLoading) {
    //   return(<div><p>Loading...</p></div>);
    // };

    // // If token = null then display sign in/sign up
    // if (!token) {
    //   return(
    //     <div>
    //       <div>
    //         {/* If sign in error, display it. Else displays nothing. */}
    //         {
    //           (signInError) ? (
    //             <p>{signInError}</p>
    //           ) : (null)
    //         }
    //         {/* Sign In Div */}
    //         <p>Sign In</p>
    //         <input 
    //           type="email" 
    //           placeholder="Email" 
    //           value={signInEmail}
    //           onChange={this.onTextboxChangeSignInEmail}
    //         />
    //         <br />
    //         <input 
    //           type="password" 
    //           placeholder="password" 
    //           value={signInPassword}
    //           onChange={this.onTextboxChangeSignInPassword}
    //         />
    //         <br />
    //         <button onClick={this.onSignIn}>Sign In</button>
    //       </div>
    //       <br />
    //       {/* Sign Up Div */}
    //       <div>
    //         <p>Sign Up</p>
    //         <input 
    //           type='text' 
    //           placeholder="First Name" 
    //           value={signUpFirstName} 
    //           onChange={this.onTextboxChangeSignUpFirstName}
    //         />
    //         <br />
    //         <input 
    //           type='text' 
    //           placeholder="Last Name" 
    //           value={signUpLastName} 
    //           onChange={this.onTextboxChangeSignUpLastName}
    //         />
    //         <br />
    //         <input 
    //           type='email' 
    //           placeholder="Email" 
    //           value={signUpEmail} 
    //           onChange={this.onTextboxChangeSignUpEmail}
    //         />
    //         <br />
    //         <input 
    //           type='password' 
    //           placeholder="Password" 
    //           value={signUpPassword} 
    //           onChange={this.onTextboxChangeSignUpPassword}
    //         />
    //         <br />
    //         <button onClick={this.onSignUp}>Sign Up</button>
    //       </div>
    //     </div>
    //   );
    // };

    return (
      <div className="App">
        {/* I Pass in the Sign In/Sign Up dialog, Which in turn passes in the Navbar. */}
        {/* This way, the Navbar can open the dialogs */}
        <NavDialogs isSignedIn={this.state.isSignedIn} />

        <h1>We puts the stuffs here!</h1>
      </div>
    );
  }
}

// Exports App
export default App;