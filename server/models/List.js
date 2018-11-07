// Require Mongoose
const mongoose = require('mongoose');

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Create a new List Schema
const ListSchema = new Schema({
    creatorId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    listMembers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// Creates model from the above Schema
const List = mongoose.model("List", ListSchema);

// Export the List model
module.exports = List;