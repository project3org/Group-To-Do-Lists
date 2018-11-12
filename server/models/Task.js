const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
<<<<<<< HEAD
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
=======
  name: { type: String, required: true },
  weight: String,
>>>>>>> master
  assignedTo: Array,
  dueDate: Date,
  completed: Boolean
},
{
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;