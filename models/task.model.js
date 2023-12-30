import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 50
      },
      description: {
        type: String,
        required: true,
        minlength: 1, 
        maxlength: 200
      }
});

const Task = mongoose.model("Task",taskSchema);

export default Task