const express = require("express");
const server = express();

server.use(express.json());

const projectsRouter = require("./projects/projects-router");
const actionsRouter = require("./actions/actions-router");

server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionsRouter);

// Configure your server here
const PORT = process.env.PORT || 9000;
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
