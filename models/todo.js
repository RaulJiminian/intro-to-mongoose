import mongoose from "mongoose";

const subtaskSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
});

// Schema: What we want our data to look like (blueprint)
const todosSchema = new mongoose.Schema({
  text: String,
  isComplete: Boolean,
  subtasks: [subtaskSchema],
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

// Model: Way for us to interface with Database via js
const Todo = mongoose.model("todos", todosSchema);

export default Todo;
