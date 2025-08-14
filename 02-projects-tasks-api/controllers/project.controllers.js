const Projects = require('../models/project.models.js');

const listProjects = async (req,res) => {
    try {
        const projects = await Projects.find({});
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const readProject = async (req,res) => {
    try {
        const id  = req.param.ProjectId;
        const project = await Projects.findById(id);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const createProject = async (req,res) => {
    try {
        const project = await Projects.create(req.body);
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateProject = async (req,res) => {
    try {

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteProject = async (req,res) => {
    try {

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    listProjects,
    readProject,
    createProject,
    updateProject,
    deleteProject
};