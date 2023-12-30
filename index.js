import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import {addTask, deleteTask, updateTask, getTasks} from "./controller/task.js"
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.get('/', (req, res) => {
  res.send('Server is running');
});
app.route('/api/v1/tasks').get(getTasks);
app.route('/api/v1/add-task').post(addTask);
app.route('/api/v1/delete-task/:id').delete(deleteTask);
app.route('/api/v1/update-task/:id').patch(updateTask);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
