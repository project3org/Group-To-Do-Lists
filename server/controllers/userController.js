// Require Models
const db = require('../models');

module.exports = {
    // Handles Creating New User
    createUser: function(req, res, next) {
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
        }

        if (!lastName) {
            return res.send({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }

        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        if (!password) {
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
    }
};