const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

class authJwt {
  static authentication(req, res, next) {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Missing_Token" };
    }
    jwt.verify(access_token, "saltacademy", (err, decoded) => {
      if (err) {
        throw { name: "INVALID_TOKEN" };
      }
      req.studentData = decoded;
      next();
    });
  }

  static async specificStudent(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Student.findById(req.studentData.id);
      console.log(result);
      if (result.id === id) {
        next();
      } else {
        throw { name: "UNAUTHORIZED_TOKEN" };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authJwt;
