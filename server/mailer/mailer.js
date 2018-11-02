// This file is for sending emails through node

// Require dependencies
const nodemailer = require('nodemailer');
const config = require('./config');

// Create Transport
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.USER,
        pass: config.PASS                            
    },
    tls: {
        rejectedUnauthorized: false
    }
});

// Exports sendMail function
module.exports = {
    // Sends Email
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, to, subject, html }, (err, info) => {
                if (err) reject(err);

                return resolve(info);
            });
        });
    }
};