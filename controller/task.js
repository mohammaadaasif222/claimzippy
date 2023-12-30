import Task from "../models/task.model.js";
import {errorHandler} from "../error.js";
export const addTask = async (req, res, next) => {
    try {
      const {title, description} = req.body;
      const task = await Task.create({title, description});
      return res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  };
  
  export const deleteTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);
  
    if (!task) {
      return next(errorHandler(404, 'Task not found!'));
    }
  
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json('Task has been deleted!');
    } catch (error) {
      next(error);
    }
  };
  
  export const updateTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return next(errorHandler(404, 'Task not found!'));
    }
  
    try {
      const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedTask);
    } catch (error) {
      next(error);
    }
  };
  
  export const getTasks = async (req, res, next) => {
    try {
      const tasks = await Task.find();
      if (!tasks) {
        return next(errorHandler(404, 'Task not found!'));
      }
      res.status(200).json(tasks);
    } catch (error) {
      next(error);
    }
  };