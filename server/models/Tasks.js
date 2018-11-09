const mongoose = require('mongoose');

const TasksSchema = new mongoose.Schema ({
    
    taskName: {
        type: String,
        default: ''
    },
    


})

module.exports = mongoose.model('Tasks', TasksSchema);