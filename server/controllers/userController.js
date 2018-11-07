// Require dependencies
// I Have passport required in case I decide to do any auth with other sites. But I wanna focus on other things for now.
const randomstring = require('randomstring');
const moment = require('moment');
const passport = require('passport');

const mailer = require('../mailer/mailer');
const db = require('../models');

// Makes sure that the email field is in the proper format
// i.g. thisemail@domain.com
validateEmail = (email) => {
  const regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEx.test(email);
};

// Exports Controllers
module.exports = {
    // Handles Creating New User
    createUser: (req, res) => {
        // Place information in variables
        const { body } = req;
        const {
            firstName,
            lastName,
            password,
            passwordVerification
        } = body;
        let { email } = body;

        // Generates random string and saves it as a secretToken
        const secretToken = randomstring.generate();

        // Pushes secretToken and isConfirmed in with user info for email verification
        req.body.secretToken = secretToken;
        req.body.isConfirmed = false;

        // Check to make sure that all fields are filled out
        // Returns corresponding error messages
        if (!firstName) {
            return res.send({
                success: false,
                message: 'First name cannot be blank.'
            });
        } else if (!lastName) {
            return res.send({
                success: false,
                message: 'Last name cannot be blank.'
            });
        } else if (!email) {
            return res.send({
                success: false,
                message: 'Email cannot be blank.'
            });
        } else if (!validateEmail(email)) {
            return res.send({
                success: false,
                message: 'Please enter a valid email.'
            })
        } else if (!password) {
            return res.send({
                success: false,
                message: 'Password cannot be blank.'
            });
        } else if (!passwordVerification) {
            return res.send({
                success: false,
                message: 'Please Verify Password.'
            });
        } else if (password !== passwordVerification) {
            return res.send({
                success: false,
                message: 'Passwords do not match.'
            });
        }

        // Changes Email to lower case
        email = email.toLowerCase();

        // Verify Email doesn't already exist in DB
        db.User.find({
            email: email
        }, (err, previousUsers)=>{
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error.'
                });
            } else if (previousUsers.length > 0) {
                return res.send({
                    success: false,
                    message: 'Account already exists.'
                });
            }

            // Save 'new User()' into variable
            const newUser = new db.User();

            // Saves New User
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.secretToken = secretToken;
            newUser.save((err, user)=>{
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error.'
                    });
                };
                return res.send({
                    success: true,
                    message: 'Signed up successfully!'
                });
            });

            // Create email text
            const verificationEmail = `Hello ${firstName},
            <br />
            Thank you for registering with Gratify!
            In order to log in to your account, we need to verify your email address.
            Please follow this link as soon as possible, link expires in one hour:
            <br />
            <a href='http://localhost:3000/account/confirmation/${secretToken}'>
                http://localhost:3000/account/confirmation/${secretToken}
            </a>
            <br />
            We hope you enjoy the site.
            <br /><br />
            <b>Thanks Again!</b>
            <br /><br />
            Gratify Devs`

            // Send email
            mailer.sendEmail('suburbandad69@thatsgoodrainbow.com', email, 'Gratify Email Verification', verificationEmail);
        });
    },

    // Handles Retrieving User Info
    getUser: (req, res) => {
        // Find user by ID
        db.User.find({_id: req.params.id}, (err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            };

            // Return User info
            return res.send({
                success: true,
                data: user
            });
        });
    },

    // Handles User Sign In
    signin:(req, res) => {
        // Place information in variables
        const { body } = req;
        const {
            password
        } = body;
        let { email } = body;

        // Check to make sure that all fields are filled out
        if (!email) {
            return res.send({
                success: false,
                message: 'Email cannot be blank.'
            });
        } else if (!password) {
            return res.send({
                success: false,
                message: 'Password cannot be blank.'
            });
        };

        // Changes Email to lower case
        email = email.toLowerCase();

        // Find Exsisting User by email
        db.User.find({
            email: email,
        }, (err, users)=>{
            if(err) {
            return res.send({
                success: false,
                message: 'Error: Server error.'
            })
            } else if (users.length != 1) {
                return res.send({
                    success: false,
                    message: 'Invalid Email.'
                })
            } else if (!users[0].isConfirmed) {
                return res.send({
                    success: false,
                    message: 'Please confirm email to sign in.'
                })
            }

            // Setting the user to a variable
            const user = users[0];
            const UserSession = db.UserSession

            // Makes sure password is valid
            if (!user.validPassword(password)) {
                return res.send({
                    success: false,
                    message: 'Invalid Password'
                });
            };

            // Creates new UserSession and targets the user's id for a token
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err, doc)=>{
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server Error'
                    });
                };

                // Sends back token after valid sign in
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    userData: users[0],
                    token: doc._id,
                    expires: doc.sessionExpires
                });
            });
        });
    },

    // Handles User Logout
    signout: (req, res) => {
        // Gets User Token
        const { query } = req;
        const { token } = query;

        // Verify the token is one of a kind and it has not been deleted.
        db.UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        }, 
        // Sets isDeleted to true
        {
            $set:{
                isDeleted: true
            }
        }, {
            new: true
        }, (err) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            }

            return res.send({
                success: true,
                message: 'User Signed Out'
            });         
        });
    },

    // Handles User Session Verification
    verifySession: (req, res) => {
        // Gets User Token
        const { query } = req;
        const { token } = query;

        // Targets current time and session expiration time 
        const currentTime = moment(new Date);
        const sessionExpires = moment(req.query.expires);

        // If token is expired, set isDeleted to true
        db.UserSession.findOneAndUpdate({
            _id: token,
            sessionExpires: currentTime > sessionExpires
        }, {
            $set: {
                isDeleted: true
            }
        }, {
            new: true
        }, (err)=>{
            if(err) {
                return err;
            };

            return res.send({
                success: false,
                message: 'Token Expired'
            })
        });

        // Verify the token is one of a kind and it has not been deleted. Also limits session time.
        db.UserSession.find({
            _id: token,
            isDeleted: false
        }, {
            new: true
        }, (err, sessions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            };

            // If no sessions exsist then the user is Signed Out
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid Session'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Session Current'
                });
            };
        });
    },

    // Handles Email Confirmation
    emailVerification: (req, res) => {
        // Target Token
        const token = req.params.token;

        // Target current time to be compared with tokenExpiration
        const currentTime = moment(new Date());

        // Finds user that has this secret token and has not confirmed email
        db.User.findOneAndUpdate({
            secretToken: token,
            isConfirmed: false

        }, {
            // Set confirmed email to true so that the user can now log in
            $set: {
                isConfirmed: true
            }
        }, {
            new: true
        }, (err, users) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            } else if (users === null) {
                return res.send({
                    success: false,
                    message: 'Error: Not a Valid Token.'
                })
            } else if (currentTime > users.secretTokenExpiresAt) {
                return res.send({
                    success: false,
                    message: 'Error : Token Expired'
                })
            }

            res.send({
                success: true,
                message: 'Email Confirmed'
            }); 
            return;
        });
    },

    // Handles retrieving user info 
    createNewSecretToken: (req, res) => {
        // Target current token
        const token = req.query.token;

        // Generate new token
        const newToken = randomstring.generate();

        // Generate new token expiration
        const newExpiration = moment(new Date).add(1, 'hour')

        // Locate user based on current secretToken
        db.User.findOneAndUpdate({
            secretToken: token
        }, {
            // Set secretToken to newToken
            $set: {
                secretToken: newToken,
                secretTokenExpiresAt: newExpiration
            }
        }, {
            new: true
        }, (err) => {
            // If error occurs, send back success false
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server Error'
                });
            };

            // Send back success true
            res.send({
                success: true,
                message: 'Token Updated'
            });
            return;
        });

        // Find current user
        db.User.find({
            secretToken: newToken
        }, (err, user) => {
            if (err) {
                console.err(err);
            };

            console.log(user);

            // Create email text
            const verificationEmail = `Hello ${user[0].firstName},
            <br />
            Thank you for registering with Gratify!
            In order to log in to your account, we need to verify your email address.
            Please follow this link as soon as possible, link expires in one hour:
            <br />
            <a href='http://localhost:3000/account/confirmation/${newToken}'>
                http://localhost:3000/account/confirmation/${newToken}
            </a>
            <br />
            We hope you enjoy the site.
            <br /><br />
            <b>Thanks Again!</b>
            <br /><br />
            Gratify Devs`

            // Send email
            mailer.sendEmail('suburbandad69@thatsgoodrainbow.com', user[0].email, 'Gratify Email Verification', verificationEmail);
        });
    }
};