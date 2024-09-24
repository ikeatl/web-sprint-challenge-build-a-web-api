// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const { validateAction } = require("./actions-middlware");
const actionsModel = require("./actions-model");

const generatedId = () => {
  return actions.length ? Math.max(...actions.map((a) => a.id)) + 1 : 1;
};
router.get("/", async (req, res) => {
  try {
    const getData = await actionsModel.get();
    res.json(getData);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const getData = await actionsModel.get(id);
    if (!getData) {
      res.status(404).json({ message: "Project not found" });
    }
    res.json(getData);
  } catch (error) {}
});

router.post("/", validateAction, async (req, res) => {
  const { description, notes, project_id } = req.body;
  const newAction = {
    description,
    notes,
    project_id,
  };
  try {
    const insertedActionData = await actionsModel.insert(newAction);
    res.status(201).json(insertedActionData);
  } catch (error) {}
});

router.put("/:id", validateAction, async (req, res) => {
  const { id } = req.params;
  const { description, notes, completed } = req.body;
  const updatedAction = {
    description,
    notes,
    completed,
  };
  try {
    const updatedActionData = await actionsModel.update(id, updatedAction);
    if (!updatedActionData) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(updatedActionData);
  } catch (error) {}
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removeActionData = await actionsModel.remove(id);
    if (!removeActionData) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(204).end();
  } catch (error) {}
});

module.exports = router;
