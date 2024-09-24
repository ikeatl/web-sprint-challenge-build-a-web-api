// add middlewares here related to actions
// actions-middleware.js
const express = require("express");

function validateAction(req, res, next) {
  const { description, notes, completed } = req.body;
  if (!description || !notes || completed === undefined) {
    return res.status(400).json({ message: "Missing required fields: description, notes, and completed" });
  }
  next();
}

module.exports = { validateAction };
