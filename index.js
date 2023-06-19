const http = require("http");
const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const routers = require("./routes/signup.route");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
mongoose.connect(process.env.Mongo_URL, {
  UseNewUrlParser: true,
  useUnifiedTopology: true,
});

const con = mongoose.connection;
con.on("open", () => {
  console.log("connected to mongo");
});
app.get("/", (req, res) => {
  res.send("app working");
});

app.use(require("./routes/signup.route"));
server.listen(process.env.Port || 6000, (err) => {
  if (err) throw err;
  console.log("server is running");
});
