require("dotenv").config();
// require("../dotenv/co");

var express = require("express");
var authRouter = express.Router();
var bodyParser = require("body-parser");

authRouter.use(bodyParser.json());

console.log(process.env.ACCOUNT_SID);
const client = require("twilio")(
  process.env.ACCOUNT_SID,
  process.env.AUTH_TOKEN
);

// /login
//     - phone number
//     - channel (sms/call)

// /verify
//     - phone number
//     - code

authRouter.get("/", (req, res) => {
  res.status(200).send({
    message: "You are on Homepage",
    info: {
      login:
        "Send verification code through /login . It contains two params i.e. phonenumber and channel(sms/call)",
      verify:
        "Verify the recieved code through /verify . It contains two params i.e. phonenumber and code",
    },
  });
});

// Login Endpoint
authRouter.post("/login", (req, res) => {
  console.log(req.body);
  if (req.body.phonenumber) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verifications.create({
        to: `+${req.body.phonenumber}`,
        channel: req.body.channel === "call" ? "call" : "sms",
      })
      .then((data) => {
        res.status(200).send({
          message: "Verification is sent!!",
          phonenumber: req.body.phonenumber,
          //   data,
        });
      });
  } else {
    res.status(400).send({
      message: "Wrong phone number :(",
      phonenumber: req.body.phonenumber,
      data,
    });
  }
});

// Verify Endpoint
authRouter.get("/verify", (req, res) => {
  console.log(req.body, req.body.code.length, process.env.SERVICE_ID);
  if (req.body.phonenumber && req.body.code.length === 4) {
    client.verify
      .services(process.env.SERVICE_ID)
      .verificationChecks.create({
        to: `+${req.body.phonenumber}`,
        code: req.body.code,
      })
      .then((data) => {
        if (data.status === "approved") {
          res.status(200).send({
            message: "User is Verified!!",
            statusCode: 200,
            // data,
          });
        } else {
          res.send(data);
        }
      })
      .catch((err) => res.send(err));
  } else {
    res.status(400).send({
      message: "Wrong phone number or code :(",
      phonenumber: req.body.phonenumber,
      data,
    });
  }
});
module.exports = authRouter;
