const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        stat: { // status
            type: String, // to-do; in-progress; done
            required: true
        },
        dueDate: {
            type: Date,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;