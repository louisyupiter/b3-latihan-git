const mongoose = require("mongoose");

const connectDB = async () => {

  try {
    const dbPathUri = "mongodb://localhost:27017/";
    const dbName = "schoolDb";
    await mongoose.connect(`${dbPathUri}${dbName}`);
    console.log(`DB Connected`);
  } catch (error) {
    console.log(error);
  }

};

module.exports = connectDB;
