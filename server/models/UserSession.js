const mongoose = require('mongoose');
const moment = require('moment');

const UserSessionSchema = new mongoose.Schema({
    userId: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    sessionExpires: {
        type: Date,
        default: moment(new Date).add(1, 'hour')
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('UserSession', UserSessionSchema);