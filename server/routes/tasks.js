const express = require("express");
const taskRoutes = express.Router();
const { Task } = require("../models");

taskRoutes.route("/tasks").get(async function (req, res) {
  const allTasks = await Task.find();
  return res.status(200).json(allTasks);
});

taskRoutes.route("/tasks/:id").get(async function (req, res) {
  const { id } = req.params;
  const task = await Task.findById(id);
  return res.status(200).json(task);
});

taskRoutes.route("/tasks").post(async function (req, res) {
  const newTask = new Task({ ...req.body });
  const insertedTask = await newTask.save();
  return res.status(201).json(insertedTask);
});

taskRoutes.route("/tasks/:id").put(async function (req, res) {
  const { id } = req.params;
  await Task.updateOne({ id }, req.body);
  const updatedTask = await Task.findById(id);
  return res.status(200).json(updatedTask);
});

taskRoutes.route("/tasks/:id").delete(async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);
  return res.status(200).json(deletedTask);
});

module.exports = taskRoutes;
