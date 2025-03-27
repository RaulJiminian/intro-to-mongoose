/*------------------------------- Starter Code -------------------------------*/
import "dotenv/config";
import mongoose from "mongoose";
import Todo from "./models/todo.js";
import User from "./models/user.js";

const connect = async () => {
  // Connect to MongoDB using the MONGODB_URI specified in our .env file.
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  // Call the runQueries function, which will eventually hold functions to work
  // with data in our db.
  await runQueries();

  // Disconnect our app from MongoDB after our queries run.
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB");

  // Close our app, bringing us back to the command line.
  process.exit();
};

const createTodo = async () => {
  const todoData = {
    text: "Learn Python",
    isComplete: false,
  };

  const todo = await Todo.create(todoData);
  console.log("New todo:", todo);
};

const findTodos = async () => {
  const todos = await Todo.find();
  console.log("All todos:", todos);
};

const findTodo = async () => {
  const todo = await Todo.findById("67ddaca5bc8de19bec070459").populate(
    "assignee"
  );
  console.log("Todo:", todo);
};

const updateTodo = async () => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    "67ddaca5bc8de19bec070459",
    { isComplete: true },
    { new: true }
  );

  console.log("Updated todo:", updatedTodo);
};

const createSubtask = async () => {
  // Assume that the todo we want to create a
  // sub-task for has the following id:
  const todoId = "67ddaca5bc8de19bec070459";
  // Look up the todo by id, assign the returned object to `todo`
  const todo = await Todo.findById(todoId);

  const subtaskData = {
    text: "Learn how arrays work",
    isComplete: false,
  };

  // Push the new sub-task data into the subtasks array on the todo:
  todo.subtasks.push(subtaskData);
  // Save the parent document:
  await todo.save();
  console.log("Modified todo:", todo);
};

const findSubtask = async () => {
  // Replace 657b25adc8146427465857d7 with an existing Todo ID
  const todoId = "67ddaca5bc8de19bec070459";
  // Replace 6580677cf30bfef697ae046f with an existing Subtask ID
  const subtaskId = "67e5a93e5376aae02bbdc5fc";

  const todo = await Todo.findById(todoId);
  const subtask = todo.subtasks.id(subtaskId);

  console.log("Subdocument:", subtask);
};

const removeSubtask = async () => {
  const todoId = "67ddaca5bc8de19bec070459";
  const subtaskId = "67e5a93e5376aae02bbdc5fc";

  const todo = await Todo.findById(todoId);
  todo.subtasks.pull(subtaskId);
  await todo.save();

  console.log("Updated document:", todo);
};

const createUser = async () => {
  const userData = {
    name: "Alex",
    email: "alex@mail.com",
  };

  const user = await User.create(userData);
  console.log("New user:", user);
};

const assignTodo = async () => {
  const todoId = "67ddaca5bc8de19bec070459";
  const userId = "67e5ae78a861c35f96b05a71";

  const updatedTodo = await Todo.findByIdAndUpdate(
    todoId,
    { assignee: userId },
    { new: true }
  );

  console.log("Updated document:", updatedTodo);
};

const runQueries = async () => {
  console.log("Queries running.");

  // await createTodo();
  // await findTodos();
  await findTodo();
  // await updateTodo();
  // await createSubtask();
  // await findSubtask();
  // await removeSubtask();
  // await createUser();
  // await assignTodo();
};

connect();
/*------------------------------ Query Functions -----------------------------*/
