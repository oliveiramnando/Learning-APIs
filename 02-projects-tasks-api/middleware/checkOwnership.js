const Project = require('../models/project.models.js');

const isOwner = async (req,res,next) => {
    try {
        const { ProjectId }  = req.params;
        const project = await Project.findById(ProjectId).select('userId')
        if (!project) {
            return res.status(404).json({ message: "Project not found "});
        }
        if (project.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized access" });
        }
        req.project = project;
        next();
    } catch (error){
        next(error);
    }
};

module.exports = isOwner;