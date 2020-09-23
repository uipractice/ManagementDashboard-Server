var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Notification = require("./Notification");
var notificationHelper = require("./notification-helper");
var userHelper = require("../authValidation/userHelper");

// CREATES A NEW food

router.post("/notification", VerifyToken, async function (req, res) {
  //   console.log(req);
  var notificationData = {};
  notificationData.NotitificationData = req.body;
  notificationData.timeStamp = Date.now();
  notificationHelper.createNotification(notificationData).then((response) => {
    console.log(response);
    res.status(200).send(response);
  });
});

// RETURNS ALL THE foods IN THE DATABASE
router.get("/getAllNotification", VerifyToken, async function (req, res) {
  await notificationHelper.getAllfoods().then((response) => {
    res.status(200).send(response);
  });
});
// router.get("/getfoods", VerifyToken, async function (req, res) {
//   await foodHelper.getAllYourfoods(req.userId).then((response) => {
//     res.status(200).send(response);
//   });
// });

// // GETS A SINGLE food FROM THE DATABASE
// router.get("/getfood/:id", VerifyToken, async function (req, res) {
//   await foodHelper.getfoodById(req.params.id).then((response) => {
//     res.status(200).send(response);
//   });
// });

// SEARCH

// router.get("/search/:id", VerifyToken, async function (req, res) {
//   await foodHelper.searchSkills(req.params.id).then((response) => {
//     res.status(200).send(response);
//   });
// });

// DELETES A food FROM THE DATABASE
router.delete("/deletenotification/:id", VerifyToken, async function (
  req,
  res
) {
  await foodHelper.deletefoodByID(req.params.id).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send({
        message: "food: " + response.result + " was deleted.",
        statusCode: 200,
      });
    } else {
      res.status(200).send(response);
    }
  });
});

// UPDATES A SINGLE food IN THE DATABASE
// Added VerifyToken middleware to make sure only an authenticated food can put to this route
// router.put("/updatefood/:id", VerifyToken, async function (req, res) {
//   await foodHelper.updatefood(req.params.id, req.body).then((response) => {
//     if (response.statusCode === 200) {
//       res.status(200).send(response);
//     } else {
//       res.status(500).send(response);
//     }
//   });
// });

// router.post("/searchwithlocation", VerifyToken, async function (req, res) {
//   console.log(req.body);
//   await foodHelper
//     .searchwithLocation(req.body.text, req.body.location)
//     .then((response) => {
//       res.status(200).send(response);
//     });
// });

// router.post("/getProfileMatchPercentage", VerifyToken, async function (
//   req,
//   res
// ) {
//   console.log(req.body);
//   await foodHelper.getProfileMatchBattery(body).then((response) => {
//     res.status(200).send(response);
//   });
// });

module.exports = router;
