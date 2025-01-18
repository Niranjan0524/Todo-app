const mongoose = require("mongoose");

// Define the schema
const TodoItemSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  completed:{
    type: Boolean,
    default: false,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});


// Create the model
const Todo = mongoose.model( "todoitems",TodoItemSchema);

module.exports = Todo;
