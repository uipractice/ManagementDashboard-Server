var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
// var env = require("../env/config");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var Food = require("../emp/EMP");
var Notification = require("./Notification");
let foodPerticularData = [];
module.exports = {
  createNotification: (data) => {
    // console.log(data);
    // data.createdBy = user;
    return new Promise((resolve, reject) => {
      Notification.create(
        data,

        function (err, Notification) {
          if (err) resolve(err);

          resolve({
            message: "success",
            statusCode: 200,
            result: Notification,
          });
        }
      );
      //   resolve(data);
    }).catch((err) => console.error(err));
  },
  getAllfoods: () => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    return new Promise((resolve, reject) => {
      Food.find(
        {},
        usersProjection,
        // "_id",
        // "foodName",
        // "foodType",
        // "price",
        // "aboutDish",
        // "quantity",
        // "rating",
        // "description",
        // "imgUrl",
        // "foodVerient",
        // "availability",
        function (err, foods) {
          if (err) resolve(err);
          resolve(foods);
        }
      );
    }).catch((err) => reject(err));
  },
  getAllYourfoods: (userId) => {
    foodPerticularData = [];
    console.log(userId);
    return new Promise((resolve, reject) => {
      //   console.log(food.find({}).project({ _id: 1 }).toArray());

      Food.find({}, function (err, foods) {
        if (err) resolve(err);
        foods.map((val) => {
          //   console.log(val.createdBy._id, userId);
          if (String(val.createdBy._id) === String(userId))
            foodPerticularData.push(val);
          // console.log(String(val.createdBy._id) === String(userId));
        });
        // console.log(foodPerticularData);
        resolve({
          message: "success",
          statusCode: 200,
          result: foodPerticularData,
        });
      });
    }).catch((err) => reject(err));
  },

  getfoodById: (foodId) => {
    // console.log(env.username);
    return new Promise((resolve, reject) => {
      Food.findById(foodId, function (err, food) {
        if (err) resolve(err);
        if (!food) resolve({ message: "not found", statusCode: 404 });
        resolve(food);
      });
    }).catch((err) => reject(err));
  },

  deletefoodByID: (foodId) => {
    return new Promise((resolve, reject) => {
      Food.findByIdAndRemove(foodId, function (err, food) {
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
  updatefood: (id, data) => {
    return new Promise((resolve, reject) => {
      Food.findByIdAndUpdate(id, data, { new: true }, function (err, food) {
        if (err) resolve(err);
        resolve({ message: "success", statusCode: 200, result: food });
      });
    });
  },

  searchSkills: (text) => {
    console.log(text);
    // var queryCond = {};
    // if (query.role) {
    //   queryCond.name = { $regex: text, $options: "i" };
    // }
    // if (query.skillset) {
    //   queryCond.city = text;
    // }
    return new Promise(async (resolve, reject) => {
      let regex = new RegExp(text, "i");
      await Food.find(
        {
          $and: [
            {
              $or: [
                { foodType: regex },
                { foodName: regex },
                { FoodVarient: regex },
              ],
            },
          ],
        },
        async function (err, food) {
          if (err) resolve(err);
          if (!food) resolve({ message: "not found", statusCode: 404 });
          resolve(food);
        }
      );
    }).catch((err) => reject(err));
  },

  //   search with location
  searchwithLocation: (skill, location) => {
    console.log(skill, location);
    console.log(skill.length);
    return new Promise(async (resolve, reject) => {
      let skillset = new RegExp(skill, "i");
      let locationdoor = new RegExp(location, "i");
      await Food.find(
        {
          $and: [
            {
              $or: [{ skillset: skillset }, { jobLocation: locationdoor }],
            },
          ],
        },
        "role skillset companyName timeStamp jobLocation",
        async function (err, food) {
          if (err) resolve(err);
          if (!food) resolve({ message: "not found", statusCode: 404 });
          resolve(food);
        }
      );
    }).catch((err) => reject(err));
  },
  getProfileMatchBattery: (data) => {},
};
