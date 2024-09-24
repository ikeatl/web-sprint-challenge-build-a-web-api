// add middlewares here related to projects
function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    return res.status(400).json({ message: "Missing required fields: name, description, and completed" });
  }
  next();
}

module.exports = { validateProject };
