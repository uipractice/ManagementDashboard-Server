var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Notification = require("./Notification");
var notificationHelper = require("./notification-helper");
var userHelper = require("../authValidation/userHelper");

// CREATES A NEW notification

router.post("/createnotification", VerifyToken, async function (req, res) {
  var notificationData = {};
  notificationData.date = req.body.date;
  notificationData.messageType = req.body.messagetype;
  notificationData.messageDescription = req.body.messagedescription;
  notificationData.publish = req.body.publish;
  notificationData.isActive = req.body.isactive;
  notificationData.deptId = req.body.deptid;
  // notificationData.NotitificationData = req.body;
  notificationData.timeStamp = Date.now();
  notificationHelper.createNotification(notificationData).then((response) => {
    res.status(200).send(response);
    this.getAllNotificationData();
  });
});

// RETURNS ALL THE Notification IN THE DATABASE
router.get("/getAllNotification", VerifyToken, async function (req, res) {
  await notificationHelper.getAllNotification().then((response) => {
    res.status(200).send(response);
  });
});
//Get only publish data
router.get("/getPublishNotification", VerifyToken, async function (req, res) {
  await notificationHelper.getAllNotification().then((response) => {
    // console.log('response..', response)
    let contact = response.filter(data => {
      return data.publish == true;
    });
    res.status(200).send(contact);
  });
});


getAllNotificationData =() =>{
  router.get("/getAllNotification", VerifyToken, async function (req, res) {
    await notificationHelper.getAllNotification().then((response) => {
      res.status(200).send(response);
    });
  });
}
getOnlyPublishData =() =>{
  router.get("/getPublishNotification", VerifyToken, async function (req, res) {
    await notificationHelper.getAllNotification().then((response) => {
      let contact = response.filter(data => {
        return data.publish == true;
      });
      res.status(200).send(contact);
    });
  });
}

// DELETES A notification FROM THE DATABASE
router.delete("/deletenotification/:id", VerifyToken, async function (req,res){
  await notificationHelper.deleteNotificationByID(req.params.id).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send({
        message: "food: " + response.result + " was deleted.",
        statusCode: 200,
      });
      this.getOnlyPublishData();
    } else {
      res.status(200).send(response);
    }
  })
});
// Update single  notification
router.put("/updatNotification/:id", VerifyToken, async function (req, res) {
  await notificationHelper.updateNotification(req.params.id, req.body).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send(response);
      this.getOnlyPublishData();
    } else {
      res.status(500).send(response);
    }
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
