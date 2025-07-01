const Project = require('../models/projectModel');

// GET all projects
exports.getProjects = async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
};

// CREATE a new project
exports.createProject = async (req, res) => {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.json(savedProject);
};

// UPDATE a project
exports.updateProject = async (req, res) => {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

// DELETE a project
exports.deleteProject = async (req, res) => {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted!" });
};
