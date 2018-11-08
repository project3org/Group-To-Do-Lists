const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  weight: String,
  assignedTo: Array,
  dueDate: Date,
  isCompleted: {
    type: Boolean,
    default: false
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
},
{
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;