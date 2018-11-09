const mongoose = require('mongoose');

const ListsSchema = new mongoose.Schema ({

    id: {
        type: Number,
        default: ''
    },

    listName: {
        type: String,
        default: ''

    }


})

module.exports = mongoose.model('Lists', ListsSchema);