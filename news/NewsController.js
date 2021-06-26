var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var newsHelper = require("./news-helper");
var userHelper = require("../authValidation/userHelper");

// CREATES A NEW 
router.post("/createNews", async function (req, res) {
  var newsData = {};
  newsData.date = req.body.date;
  newsData.messageType = req.body.messageType;
  newsData.messageDescription = req.body.messageDescription;
  newsData.publish = req.body.publish;
  newsData.isActive = req.body.isActive;
  newsData.deptId = req.body.deptId;
  newsData.timeStamp = Date.now();

  newsHelper.createNews(newsData).then((response) => {
    res.status(200).send(response);
    this.getAllnewsData();
  });
});

// Get total News and Notification data
router.get("/getAllData", async function (req, res) {
  let finalArray = [];
  await newsHelper.getAllNews().then((response) => {
    finalArray.push(response)
    // res.status(200).send(response);
  });
  await newsHelper.getAllNotification().then((response) => {
    finalArray.push(response)
    // res.status(200).send(response);
  });
  res.status(200).send(finalArray);
});
// RETURNS ALL THE Notification IN THE DATABASE
router.get("/getAllNews", async function (req, res) {
  await newsHelper.getAllNews().then((response) => {
    res.status(200).send(response);
  });
});
//Get only publish data
router.get("/getPublishNews", async function (req, res) {
  await newsHelper.getAllNews().then((response) => {
    // console.log('response..', response)
    let contact = response.filter(data => {
      return data.publish == true;
    });
    res.status(200).send(contact);
  });
});
// Account wise publish news
router.get("/getPublishNewsByDept/:id", async function (req, res) {
  await newsHelper.getNewsByDept(req.params.id).then((response) => {
    // console.log('response', response)
    let publishNews = response.filter(data => {
      return data.publish == true;
    });
    res.status(200).send(publishNews);
  });
});


getAllnewsData =() =>{
  router.get("/getAllNews", async function (req, res) {
    await newsHelper.getAllNews().then((response) => {
      res.status(200).send(response);
    });
  });
}
getOnlyPublishNews =() =>{
  router.get("/getPublishNews", async function (req, res) {
    await newsHelper.getAllNews().then((response) => {
      let contact = response.filter(data => {
        return data.publish == true;
      });
      res.status(200).send(contact);
    });
  });
}



// DELETES A notification FROM THE DATABASE
router.delete("/deletenews/:id", async function (req,res){
  await newsHelper.deleteNewsByID(req.params.id).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send({
        message: "food: " + response.result + " was deleted.",
        statusCode: 200,
      });
      this.getAllnewsData();
    } else {
      res.status(200).send(response);
    }
  })
});
// Update single  notification
router.put("/updatNews/:id", async function (req, res) {
  await newsHelper.updateNews(req.params.id, req.body).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send(response);
      this.getAllnewsData()
    } else {
      res.status(500).send(response);
    }
  });
});


module.exports = router;
