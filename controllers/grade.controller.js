const Grade = require("../models/Grade");

class gradeController {
  static async createGrade(req, res, next) {
    try {
      const { gradename, score } = req.body;
      const result = await Grade.create({
        gradename,
        score,
      });
      res.status(200).json({ message: "Grade Created", data: result });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = gradeController;
