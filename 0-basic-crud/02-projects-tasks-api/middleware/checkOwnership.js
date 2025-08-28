const Project = require('../models/project.models.js');
const Task = require('../models/task.models.js');

const isOwner = async (req,res,next) => {
    try {
        const { ProjectId }  = req.params;
        const project = await Project.findById(ProjectId).select('userId') // looks up project in databse by ProjectId and selects the userId field within that document
        if (!project) {
            return res.status(404).json({ message: "Project not found "});
        }
        if (project.userId.toString() !== req.user._id.toString()) { // toString ensures it's treated as a string; compares both userIds to ensure they're the same user accessing
            return res.status(403).json({ message: "Unauthorized access" });
        }
        req.project = project; // attaches project to req.project to ensure downstream code doesn't need to query DB again
        next();
    } catch (error){
        next(error);
    }
};

module.exports = isOwner;