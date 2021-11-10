const express = require("express");

const connectDB = require("./configs/connectionDb")
const router = require("./routers/routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = 8080;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my App");
});

app.get("/1234", (req, res) => {
  res.send("Welcome to my App");
});

app.use("/api", router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`aplikasi kita jalan di http://localhost:${port}`);
});
