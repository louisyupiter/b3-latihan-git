const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: String,
    telp: String,
    grades: [{ type: Schema.Types.ObjectId, ref: "grade" }],
    createdDate: {
      type: Date,
      default: new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
