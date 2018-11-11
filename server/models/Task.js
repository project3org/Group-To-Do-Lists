const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'List'
  },
  name: { 
    type: String, 
    required: true 
  },
  description: {
    type: String,
    required: true
  },
  weight: Number,
  assignedTo: Array,
  dueDate: Date,
  isCompleted: {
    type: Boolean,
    default: false
  }
},
{
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;