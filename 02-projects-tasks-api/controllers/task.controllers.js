const Tasks = require('../models/task.models.js');

const readTasks = async (req,res) => {
    try {
        const task = await Tasks.find({});
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTask = async (req,res) => {
    try {
        const projectId = req.params.ProjectId;
        const { title, stat, dueDate } = req.body;
        const task = await Tasks.create({
            projectId,
            title,
            stat,
            dueDate
        });
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateTask = async (req,res) => {
    try {
        const id = req.params.TaskId;
        const updatedTask = await Tasks.findByIdAndUpdate(id, req.body);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteTask = async (req,res) => {
    try {
        const id = req.params.TaskId;
        await Tasks.findByIdAndDelete(id);
        res.status(200).json({ message: "Task Deleted! "});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    readTasks,
    createTask,
    updateTask,
    deleteTask,
}