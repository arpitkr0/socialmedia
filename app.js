const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const homeRoute = require("./routes/home");
const userRoute = require("./routes/user");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/socials")
  .then(() => console.log("MongoDB connected"));

//view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
app.use("/home", restrictToLoggedinUserOnly, homeRoute);
app.use("/", userRoute);

app.listen(PORT, () => console.log(`Server started at port ${PORT}!`));
