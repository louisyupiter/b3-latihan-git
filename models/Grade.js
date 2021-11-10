const mongoose = require("mongoose");
const { Schema } = mongoose;

const gradeSchema = new Schema(
  {
    gradename: String,
    score: { type: Number, min: 0, max: 100 },
  },
  {
    timestamps: true,
  }
);

const Grade = mongoose.model("grade", gradeSchema);
module.exports = Grade;
