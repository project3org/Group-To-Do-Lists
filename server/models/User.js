const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: ''
    },
    secretToken: {
        type: String,
        default: ''
    },
    secretTokenExpiresAt: {
        type: Date,
        default: moment(new Date).add(1, 'hour')
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    lists: [
        {
            type: Schema.Types.ObjectId,
            ref: "List"
        }
    ]
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);