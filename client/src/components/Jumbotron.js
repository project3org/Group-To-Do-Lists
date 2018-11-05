// Import react and dependencies
import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

import SignUp from './dialogs/SignUp';
import SignIn from './dialogs/SignIn';
import { getFromStorage } from '../utils/storage';

// Creating style to make footer sticky
const styles = {
  card: {
    backgroundURL: 'https://mdbootstrap.com/img/Photos/Others/forest2.jpg'
  }
};

// Create component
class Jumbotron extends React.Component {
    // Create States
    state = {
        openSignIn: false,
        openSignUp: false,
        signedIn: false
    };

    // Checks for user token on component load
    componentDidMount() {
        // Get obj from storage
        const obj = getFromStorage('the_main_app');

        // If token exists in obj...
        if (obj && obj.token) {
        // ...verify token
        const { token, expires } = obj;
        fetch(`/api/account/verify?token=${token}&expires=${expires}`)
        .then(res => res.json())
        .then(json => {
        // If Response is successful
        if (json.success) {
            // Set State token to exsisting token and sign in to true
            // Set Button to be 'Sign Out'
            this.setState({
            token,
            signedIn: true,
            signedInOrOutButton: 'Sign Out'
            });
        };
        });
        } else {
        // Else set state signed in to false and set button to be 'Sign In'
        this.setState({
            signedIn: false,
            signedInOrOutButton: 'Sign In'
        });
        };
    };

    // Render Component
    render() {
        // If signed out, prompt user to sign in
        if(!this.state.signedIn) {
            return (
                <div className="card card-image center-image" style={styles.card}>
                    {/* Passing in sign in and sign up dialogs so jumbotron will have access. */}
                    <SignIn />
                    <SignUp />
                    <div className="text-white text-center rgba-stylish-strong py-5 px-4">
                        <div className="py-5">
                    
                            {/* Content */}
                            <h5 className="h5 orange-text"><i className="fa fa-list"></i> Task Managing Made Easy</h5>
                            <h2 className="card-title h1 my-4 py-2">Welcome to Gratify!</h2>
                            <p className="mb-4 pb-2 px-md-5 mx-md-5">Gratify is a task managing system designed to simplify group assignments by assigning users the tasks they would prefer to do the most. We utilize a very simple equation, MORE work should get done FASTER when people perform tasks that they enjoy doing.</p>
                            <a className="btn peach-gradient" href="#!"><i className="fa fa-clone left"></i>Sign In</a>
                            <br /><br />
                            <p>If you do not have an account, please <a href="#!">Sign Up.</a></p>
                    
                        </div>
                    </div>
                </div>
            );
        } else {
            // else prompt them to go to their lists
            return (
                <div className="card card-image center-image" style={styles.card}>
                    {/* Passing in sign in and sign up dialogs so jumbotron will have access. */}
                    <SignIn />
                    <SignUp />
                    <div className="text-white text-center rgba-stylish-strong py-5 px-4">
                        <div className="py-5">
                    
                            {/* Content */}
                            <h5 className="h5 orange-text"><i className="fa fa-list"></i> Task Managing Made Easy</h5>
                            <h2 className="card-title h1 my-4 py-2">Welcome back to Gratify!</h2>
                            <p className="mb-4 pb-2 px-md-5 mx-md-5">Gratify is a task managing system designed to simplify group assignments by assigning users the tasks they would prefer to do the most. We utilize a very simple equation, MORE work should get done FASTER when people perform tasks that they enjoy doing.</p>
                            <a className="btn peach-gradient" href="#!"><i className="fa fa-clone left"></i> View Your Lists</a>
                    
                        </div>
                    </div>
                </div>
            );
        };
    };
};

// Export Component
export default Jumbotron;