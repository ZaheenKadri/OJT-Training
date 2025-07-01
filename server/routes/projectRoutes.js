// const express = require('express');
// const auth = require('../middleware/auth');
// const Project = require('../models/projectModel');
// const router = express.Router();

// router.get("/", async (req, res) => {
//   try{
//     const projects = await Project.find();
//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ message: "server Error" });
//   }
// });
// router.post('/', auth, async (req, res) => {
//   const { title, description, link } = req.body;
//   const newProj = new Project({ title, description, link, user: req.user });
//   const saved = await newProj.save();
//   res.json(saved); 
// });
// router.put('/:id', auth, async (req, res) => {
//   const { title, description, link } = req.body;
//   const proj = await Project.findOneAndUpdate(
//     { _id: req.params.id, user: req.user },
//     { title, description, link },
//     { new: true }
//   );
//   if (!proj) {
//     return res.status(404).json({ message: 'Project not found or not authorized' });
//   }
//   res.json(proj);
// });
// router.delete('/:id', auth, async (req, res) => {
//   const deletedProject = await Project.findOneAndDelete({
//     _id: req.params.id,
//     user: req.user
//   });
//   if (!deletedProject) {
//     return res.status(404).json({ message: 'Project not found or not authorized' });
//   }
//   res.json({ message: 'Project deleted successfully' });
// });

const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/projectModel');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "server Error" });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description, link } = req.body;
  const newProj = new Project({ title, description, link, user: req.user });
  const saved = await newProj.save();
  res.json(saved); 
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, link } = req.body;
  const proj = await Project.findOneAndUpdate(
    { _id: req.params.id, user: req.user },
    { title, description, link },
    { new: true }
  );
  if (!proj) {
    return res.status(404).json({ message: 'Project not found or not authorized' });
  }
  res.json(proj);
});

router.delete('/:id', auth, async (req, res) => {
  const deletedProject = await Project.findOneAndDelete({
    _id: req.params.id,
    user: req.user
  });
  if (!deletedProject) {
    return res.status(404).json({ message: 'Project not found or not authorized' });
  }
  res.json({ message: 'Project deleted successfully' });
});

module.exports = router;

const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const projectModel = require('../models/projectModel');

// GET all projects
router.get('/', getProjects);

// POST a new project
router.post('/', createProject);

// PUT to update a project
router.put('/:id', updateProject);

// DELETE a project
router.delete('/:id', deleteProject);

module.exports = router;