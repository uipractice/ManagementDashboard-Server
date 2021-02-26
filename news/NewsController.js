var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");

// router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var newsHelper = require("./news-helper");
var userHelper = require("../authValidation/userHelper");

// CREATES A NEW notification

router.post("/createNews", VerifyToken, async function (req, res) {
  var newsData = {};
  newsData.date = req.body.date;
  newsData.messageType = req.body.messagetype;
  newsData.messageDescription = req.body.messagedescription;
  newsData.publish = req.body.publish;
  newsData.isActive = req.body.isactive;
  newsData.deptId = req.body.deptid;
  newsData.timeStamp = Date.now();

  newsHelper.createNews(newsData).then((response) => {
    res.status(200).send(response);
    this.getAllnewsData();
  });
});

// RETURNS ALL THE Notification IN THE DATABASE
router.get("/getAllNews", VerifyToken, async function (req, res) {
  await newsHelper.getAllNews().then((response) => {
    res.status(200).send(response);
  });
});
//Get only publish data
router.get("/getPublishNews", VerifyToken, async function (req, res) {
  await newsHelper.getAllNews().then((response) => {
    // console.log('response..', response)
    let contact = response.filter(data => {
      return data.publish == true;
    });
    res.status(200).send(contact);
  });
});
// Account wise publish news
router.get("/getPublishNewsByDept/:id", VerifyToken, async function (req, res) {
  await newsHelper.getNewsByDept(req.params.id).then((response) => {
    console.log('response', response)
    let publishNews = response.filter(data => {
      return data.publish == true;
    });
    res.status(200).send(publishNews);
  });
});


getAllnewsData =() =>{
  router.get("/getAllNews", VerifyToken, async function (req, res) {
    await newsHelper.getAllNews().then((response) => {
      res.status(200).send(response);
    });
  });
}
getOnlyPublishNews =() =>{
  router.get("/getPublishNews", VerifyToken, async function (req, res) {
    await newsHelper.getAllNews().then((response) => {
      let contact = response.filter(data => {
        return data.publish == true;
      });
      res.status(200).send(contact);
    });
  });
}



// DELETES A notification FROM THE DATABASE
router.delete("/deletenews/:id", VerifyToken, async function (req,res){
  await newsHelper.deleteNewsByID(req.params.id).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send({
        message: "food: " + response.result + " was deleted.",
        statusCode: 200,
      });
      this.getOnlyPublishNews();
    } else {
      res.status(200).send(response);
    }
  })
});
// Update single  notification
router.put("/updatNews/:id", VerifyToken, async function (req, res) {
  await newsHelper.updateNotification(req.params.id, req.body).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send(response);
      this.getOnlyPublishNews();
    } else {
      res.status(500).send(response);
    }
  });
});


module.exports = router;
