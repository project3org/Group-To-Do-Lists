// Import react and dependencies
import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

// Import Local Dependencies
import { openSignIn, openSignUp } from '../redux/actions/userActions';

// Create component
class Jumbotron extends React.Component {
    // Render Component
    render() {
        // If signed out, prompt user to sign in or sign up
        if(!this.props.signedIn) {
            return (
                <div className="card card-image center-image">
                    <div className="text-white text-center rgba-stylish-strong py-5 px-4">
                        <div className="py-5">
                    
                            {/* Content */}
                            <h5 className="h5 orange-text"><i className="fa fa-list"></i> Task Managing Made Easy</h5>
                            <h2 className="card-title h1 my-4 py-2">Welcome to Gratify!</h2>
                            <p className="mb-4 pb-2 px-md-5 mx-md-5">Gratify is a task managing system designed to simplify group assignments by assigning users the tasks they would prefer to do the most. We utilize a very simple equation, MORE work should get done FASTER when people perform tasks that they enjoy doing.</p>
                            <a className="btn peach-gradient" href="#!" onClick={this.props.openSignIn}><i className="fa fa-clone left"></i>Sign In</a>
                            <br /><br />
                            <p>If you do not have an account, please <a href="#!" onClick={this.props.openSignUp}>Sign Up.</a></p>
                    
                        </div>
                    </div>
                </div>
            );
        } else {
            // else prompt them to go to their lists
            return (
                <div className="card card-image center-image">
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
        }
    };
};

// Create PropTypes
Jumbotron.propTypes = {
    openSignIn: PropTypes.func.isRequired,
    openSignUp: PropTypes.func.isRequired,
};

// Maps States to Component Props
const mapStateToProps = state => ({
    signedIn: state.user.signedIn
});

// Export Component
export default connect(mapStateToProps, { openSignIn, openSignUp })(Jumbotron);