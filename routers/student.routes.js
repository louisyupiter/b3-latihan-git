const express = require("express");
const studentRouter = express.Router();
const studentController = require("../controllers/student.controller");
const auth = require('../middlewares/authJwt')

studentRouter.post("/", studentController.createStudent);
studentRouter.post("/login", studentController.login);

studentRouter.use(auth.authentication);

studentRouter.get("/", studentController.viewStudents);

studentRouter.get("/:id", auth.specificStudent, studentController.viewSpecificStudent);
studentRouter.put("/:id", auth.specificStudent, studentController.updateStudent);
studentRouter.delete("/:id", auth.specificStudent, studentController.deleteStudent);
studentRouter.patch("/:id", auth.specificStudent, studentController.pacthStudentGrade);

module.exports = studentRouter;
