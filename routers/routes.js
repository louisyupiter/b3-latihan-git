const express = require("express");
const router = express.Router();
const studentRouter = require('./student.routes');
const gradeRouter = require('./grade.routes');

router.use('/student', studentRouter);
router.use('/grade', gradeRouter);

module.exports = router;
