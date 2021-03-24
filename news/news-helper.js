var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
// var env = require("../env/config");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var News = require("./News");
var Notification = require("../notification/Notification")
let foodPerticularData = [];

module.exports = {
    createNews: (data) => {
      console.log(data);
      // data.createdBy = user;
      return new Promise((resolve, reject) => {
        News.create(data,function (err, News){

            if (err) reject(err);
            resolve({
              message: "success",
              statusCode: 200,
              result: News,
            });
          }
        );
      }).catch((err) => console.error(err));
    },
    getAllNews: () => {
      var usersProjection = {
        date: 1,
        messageType: 1,
        messageDescription: 1,
        publish: 1,
        isActive: 1,
        deptId: 1,
      }
      return new Promise((resolve, reject) => {
        News.find({},usersProjection,function (err, foods) {
            if (err)  reject(err);
            resolve(foods);
          }
        );
      }).catch((err) => reject(err));
    },

    getAllNotification: () => {
      var usersProjection = {
        date: 1,
        messageType: 1,
        messageDescription: 1,
        publish: 1,
        isActive: 1,
      }
      return new Promise((resolve, reject) => {
        Notification.find(
          {},
          usersProjection,
         
          function (err, foods) {
            if (err)  reject(err);
            resolve(foods);
          }
        );
      }).catch((err) => reject(err));
    },
  
    getNewsByDept: (deptId) => {
      return new Promise((resolve, reject) => {
        News.find({deptId: deptId }, function (err, food) {
          if (err) resolve(err);
          if (!food) resolve({ message: "not found", statusCode: 404 });
          resolve(food);
        });
      }).catch((err) => reject(err));
    },
  
    deleteNewsByID: (newsId) => {
      return new Promise((resolve, reject) => {
        News.findByIdAndRemove(newsId, function (err, food) {
          console.log("food is", food);
          if (err) resolve(err);
          if (food === null) {
            resolve({ message: "not found", statusCode: 404 });
          } else {
            resolve({ message: "success", statusCode: 200, result: food._id });
          }
        }).catch((err) => reject(err));
      });
    },
    updateNews: (id, data) => {
      return new Promise((resolve, reject) => {
        News.findByIdAndUpdate(id, data, {new: true},function (err, food) {
          if (err) resolve(err);
          resolve({ message: "success", statusCode: 200, result: food });
        });
      });
    },
  
  };