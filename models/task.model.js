import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: String,
    description: {
        type: String,
        maxlength: 200
    }
});

const Task = mongoose.model("Task",taskSchema);

export default Task