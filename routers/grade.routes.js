const express = require("express");
const gradeRouter = express.Router();
const gradeController = require("../controllers/grade.controller");

//create
gradeRouter.post("/", gradeController.createGrade);

module.exports = gradeRouter;
