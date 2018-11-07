const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: { type: String, required: true },
  weight: String,
  assignedTo: Array,
  dueDate: Date,
  completed: Boolean
},
{
  timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;