const Todo = require("../model/todoSchema");

//get todo list
const getTodo = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  //pagination - page, limit, skip. logic = skip((page -  1) * limit)

  try {
    const todos = await Todo.find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add todo list
const addTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: false,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update todo list
const updateTodo = async (req, res) => {
  const id = req.params.id;
  try {
    const updateTodo = await Todo.findByIdAndUpdate(id, req.body);
    res.json(updateTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//delete todo
const deleteTodo = async (req, res) => {
  const id = req.params.id;
  try {
   const response = await Todo.findByIdAndDelete(id);
   return res.json(response)
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { addTodo, getTodo, updateTodo, deleteTodo };
