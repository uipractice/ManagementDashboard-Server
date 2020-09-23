var express = require("express");
var demoRouter = express.Router();
var bodyParser = require("body-parser");
demoRouter.use(bodyParser.json());
var User = require("../user/User");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
var bcrypt = require("bcryptjs");
var config = require("../config"); // get config file

demoRouter.post("/login", async function (req, res) {
  console.log(req.body);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send("Error on the server.");
    if (!user) return res.status(404).send("No user found.");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token as JSON
    res.status(200).send({ auth: true, token: token });
  });
});
/* GET home page. */
demoRouter.post("/posthelp", async function (req, res) {
  res.status(200).send({ message: "success", statusCode: 200 });
});
demoRouter.post("/register", function (req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);
  console.log(req.body);
  try {
    User.create(
      {
        name: "vinay",
        type: "a",
        email: req.body.email,
        password: "kjfshdkjfhdsjkhfkjdshfjhsdjfk",
        designation: "dskdjsakljd",
        skills: [],
        registeredDate: Date.now(),
      },
      function (err, user) {
        if (err)
          return res
            .status(500)
            .send("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400, // expires in 24 hours
        });

        res.status(200).send({ auth: true, token: token });
      }
    );
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
module.exports = demoRouter;
