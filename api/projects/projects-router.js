// Write your "projects" router here!
const express = require("express");
const router = express.Router();
const { validateProject } = require("./projects-middleware");
const projectsModel = require("./projects-model");

const generatedId = () => {
  return projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
};

router.get("/", async (req, res) => {
  try {
    const getData = await projectsModel.get();
    res.json(getData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getData = await projectsModel.get(id);
    if (!getData) {
      res.status(404).json({ message: "Project not found" });
    }
    res.json(getData);
  } catch (error) {}
});

router.post("/", validateProject, async (req, res) => {
  const { name, description, completed } = req.body;
  const newProject = {
    name,
    description,
    completed,
  };
  try {
    const insertedData = await projectsModel.insert(newProject);

    res.status(201).json(insertedData);
  } catch (error) {}
});

router.put("/:id", validateProject, async (req, res) => {
  const { id } = req.params;
  const { name, description, completed } = req.body;

  const updatedProject = {
    name,
    description,
    completed,
  };
  try {
    const updatedData = await projectsModel.update(id, updatedProject);
    if (!updatedData) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedProject);
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removeData = await projectsModel.remove(id);
    if (!removeData) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(204).end();
  } catch (error) {}
});

router.get("/:id/actions", async (req, res) => {
  const { id } = req.params;
  try {
    const getActions = await projectsModel.getProjectActions(id);
    if (!getActions) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(getActions);
  } catch (error) {}
});

module.exports = router;
