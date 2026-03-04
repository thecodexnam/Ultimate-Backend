import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    deadline: {
        type: Date
    },
    subtasks: [{
        title: { type: String, required: true },
        completed: { type: Boolean, default: false }
    }],
    priority: {
        type: String,
        enum: ["High", "Medium", "Low"],
        default: "Medium"
    },
    category: {
        type: String,
        default: "General"
    },
    estimatedHours: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true });

const Task = mongoose.model("Task", taskSchema);

export default Task;
