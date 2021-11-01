"use strict";
var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var httpContext = require("express-http-context");
var cors = require("cors");
var app = express();
var db = require("./db");
const path = require('path');
global.__root = __dirname + "/";

// app.use(express.json());
// app.use(cookieParser());

// app.use(httpContext.middleware);
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

var AuthController = require("./auth/AuthController");
var demo = require("./auth/demoController");

var FoodController = require("./emp/EmpController");
var HrController = require("./hrdashboard/HrController");


var UserController = require("./user/UserController");

var otpController = require("./auth/otpController");
var notificationController = require("./notification/NotificationController");
var newsController = require("./news/NewsController");

// var emailController = require("./email/emailController");
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Accept,Accept-Language,Content-Language,Content-Type");
  res.header("Access-Control-Allow-Headers", "Content-Length,Content-Range");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader("Access-Control-Allow-Origin", "https://management-dashboard.evokeapps.com");

//   // Request methods you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Accept,Accept-Language,Content-Language,Content-Type"
//   );
//   // Request headers you wish to allow
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader("Access-Control-Allow-Credentials", true);

//   // Pass to next layer of middleware
//   next();
// });

app.get("/api", function (req, res) {
  res.status(200).send("API works.");
});
app.get("/", function (req, res) {
  res.status(200).send("<h1>Node js is working</h1>");
});
// app.post("/posthelp", function (req, res) {
//   res.status(200).send({ message: "success", statusCode: 200 });
// });
app.use("/api/demo", demo);

app.use("/api/auth", AuthController);

app.use("/api/otp", otpController);

app.use("/api/users", UserController);

app.use("/api/emp", FoodController);

app.use("/api/hr", HrController);

app.use("/api/notification", notificationController);

app.use("/api/news", newsController);

//app.use("/api/email", emailController);

app.use(function (req, res, next) {
  next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
