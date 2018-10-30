const User = require('../../models/User')

module.exports = (app) => {
    // Sign Up
    app.post('/api/account/signup', (req, res, next)=>{
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password
        } = body;

        // Check to make sure that all fields are filled out
        if (!firstName) {
            res.end({
                success: false,
                message: 'Error: First name cannot be blank.'
            });
        }

        if (!lastName) {
            res.end({
                success: false,
                message: 'Error: Last name cannot be blank.'
            });
        }

        if (!email) {
            res.end({
                success: false,
                message: 'Error: Email cannot be blank.'
            });
        }

        if (!password) {
            res.end({
                success: false,
                message: 'Error: Password cannot be blank.'
            });
        }

        // Changes Email to lower case
        email = email.toLowerCase();

        // Verify Email doesn't already exist
        User.find({
            email: email
        }, (err, previousUsers)=>{
            if (err) {
                res.end({
                    success: false,
                    message: 'Error: Server error.'
                });
            } else if (previousUsers.length > 0) {
                res.end({
                    success: false,
                    message: 'Error: Account already exists.'
                });
            }

            // Save 'new User()' into variable
            const newUser = new User();

            // Saves New User
            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user)=>{
                if (err) {
                    res.end({
                        success: false,
                        message: 'Error: Server error.'
                    });
                };
                res.end({
                    success: true,
                    message: 'Signed up successfully!'
                });
            });
        });
    });
};