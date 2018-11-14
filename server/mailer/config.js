// Require dotenv
require('dotenv').config();

// Export Mailer information
module.exports = {
    USER: process.env.MAILER_EMAIL,
    PASS: process.env.MAILER_PASS
};