const express = require("express");
const router = express.Router();
const {getTodo, addTodo, updateTodo, deleteTodo} = require("../controller/todoController")

router.get("/getTodo", getTodo);
router.post("/addTodo", addTodo);
router.put("/updateTodo/:id", updateTodo);
router.delete("/deleteTodo/:id", deleteTodo);

module.exports = router;
