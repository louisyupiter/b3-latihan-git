const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class studentController {
  static async createStudent(req, res, next) {
    const { fullname, email, password, telp } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
      const result = await Student.create({
        fullname: fullname,
        email: email,
        password: hashedPassword,
        telp: telp,
      });
      res.status(201).json({ message: "Data Student Created", data: result });
    } catch (error) {
      next(error);
    }
  }

  static async viewStudents(req, res, next) {
    try {
      const result = await Student.find().populate("grades").select("-__v");
      if (result.length === 0) {
        throw { name: "NOT_FOUND_ALL" };
      } else {
        res
          .status(200)
          .json({ message: "Data Student ditampilkan", data: result });
      }
    } catch (error) {
      next(error);
    }
  }

  static async viewSpecificStudent(req, res, next) {
    const { id } = req.params;

    try {
      const result = await Student.findById(id);
      if (result === null) {
        throw { name: "NOT_FOUND_SPECIFIC" };
      } else {
        res.status(200).json({
          message: "student dengan id tertentu ditampilkan",
          data: result,
        });
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateStudent(req, res, next) {
    const { id } = req.params;
    const { telp, fullname } = req.body;
    try {
      const result = await Student.findByIdAndUpdate(
        id,
        { telp, fullname },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "student dengan id tertentu diupdate", data: result });
    } catch (error) {
      next(error);
    }
  }

  static async deleteStudent(req, res, next) {
    const { id } = req.params;
    try {
      const result = await Student.findByIdAndDelete(id);
      res
        .status(202)
        .json({ message: "student dengan id tertentu didelete", data: result });
    } catch (error) {
      next(error);
    }
  }

  static async pacthStudentGrade(req, res, next) {
    const { id } = req.params;
    const { idgrade } = req.body;

    try {
      const result = await Student.findByIdAndUpdate(
        id,
        { $push: { grades: idgrade } },
        { new: true }
      );
      res.status(202).json({
        message: "student dengan id tertentu dipacth gradenya",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      const result = await Student.findOne({ email });
      if (!result) {
        throw { name: "UNAUTHORIZED" };
      }
      const passwordIsValid = bcrypt.compareSync(password, result.password);
      if (!passwordIsValid) {
        throw { name: "UNAUTHORIZED" };
      }
      const token = jwt.sign(
        { id: result.id, fullname: result.fullname, email: result.email, telp: result.telp },
        "saltacademy",
        {
          expiresIn: "1h",
        }
      );

      res
        .status(200)
        .json({ message: "Berhasil login", data: result, AccessToken: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = studentController;

// const createStudent = async (req, res, next) => {
//   const { fullname, email, telp } = req.body;

//   try {
//     const result = await Student.create({
//       fullname: fullname,
//       email: email,
//       telp: telp,
//     });
//     res.status(201).json({ message: "Data Student Created", data: result });
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { createStudent };
