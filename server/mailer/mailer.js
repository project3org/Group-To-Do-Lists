// This file is for sending emails through node

// Require dependencies
const nodemailer = require('nodemailer');
const xoauth2 = require('xoauth2');
const config = require('./config');

// Create Transport
const transport = nodemailer.createTransport({
    service: "gmail.com",
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            type: "OAuth2",
            user: "corey.waitforit.mitchell@gmail.com",
            clientId: "1069498841349-bjbtrdgshq46ghj38d822970mvvicl70.apps.googleusercontent.com",
            clientSecret: "CR20Z1V36vuHhrpd1drYoSSA",
            // refreshToken: "REFRESH_TOKEN_HERE"
        })                              
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