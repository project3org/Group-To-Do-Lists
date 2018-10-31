// Require Models
const db = require('../models');

module.exports = {
    // Handles Creating New User
    createUser: (req, res) => {
        // Place information in variables
        const { body } = req;
        const {
            firstName,
            lastName,
            password
        } = body;
        let { email } = body;

        // Check to make sure that all fields are filled out
        if (!firstName) {
            return res.send({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        } else if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        } else if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        } else if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
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
                    message: 'Error: Account already exists.'
                });
            }

            // Save 'new User()' into variable
            const newUser = new db.User();

            // Saves New User
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
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
                message: 'Error: Email cannot be blank.'
            });
        } else if (!password) {
            return res.send({
                success: false,
                message: 'Error: Password cannot be blank.'
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
                        message: 'Error: Invalid Email'
                    })
            };

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
                }

                // Sends back token after valid sign in
                return res.send({
                    success: true,
                    message: 'Valid sign in',
                    userData: users[0],
                    token: doc._id
                });
            });
        });
    },

    // Handles User Verification
    verify: (req, res) => {
        // Gets User Token
        const { query } = req;
        const { token } = query;

        // Verify the token is one of a kind and it has not been deleted.
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
            
            if (sessions.length != 1) {
                return res.send({
                    success: false,
                    message: 'Error: Invalid'
                });
            } else {
                return res.send({
                    success: true,
                    message: 'Good'
                });
            };
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
                message: 'Good'
            });         
        });
    }
};