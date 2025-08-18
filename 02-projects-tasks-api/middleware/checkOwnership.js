const Project = require('../models/project.models.js');

const isOwner = async (req,res,next) => {
    const ProjectId  = req.params.ProjectId;
    const project = Project.findById(ProjectId)
    if (!project) {
        return res.status(404).json({ message: "Project not found "});
    }
    if (project.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Unauthorized access" });
    }
    req.project = project;
    next();
};

module.exports = isOwner;