const express = require("express");
const app = express();
const middlewareError = require("./middleware/error");
const cookieParser = require("cookie-parser");

//Using Middlewares
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

//Routes Import
const user = require("./routes/userRoutes");
const task = require("./routes/taskRoutes");

app.use("/api/v1", user);
app.use("/api/v1", task);

//Middleware for errors
app.use(middlewareError);

module.exports = app;