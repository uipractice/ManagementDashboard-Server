var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
// var env = require("../env/config");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var Food = require("./EMP");
var EMP = require("../user/Emp");
let foodPerticularData = [];
module.exports = {
  createfood: (data) => {
    console.log(data);
    // data.createdBy = user;
    return new Promise((resolve, reject) => {
      Food.create(
        data,

        function (err, food) {
          if (err) resolve(err);

          resolve({ message: "success", statusCode: 200, result: food });
        }
      );
      //   resolve(data);
    }).catch((err) => console.error(err));
  },
  getAllEmployees: () => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    return new Promise((resolve, reject) => {
      EMP.find(
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
  getDepartmentWiseProjectList: (deptName) => {
    const usersProjection = {
      __v: false,
      createdBy: false,
    };

    const query = { employee_department_name: deptName };
    return new Promise((resolve, reject) => {
      // data === "B"
      //   ? (queryString = "Billable")
      //   : (queryString = "Non Billable");
      EMP.distinct("employee_ou_name", { employee_department_name: { $eq: deptName } }, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },
  getProjectWiseEmployeeList: (projName) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };

    return new Promise((resolve, reject) => {
      EMP.find({ employee_ou_name: { $eq: projName } }, usersProjection, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },
  getAccountWiseEmployeeList: (accountName) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };

    return new Promise((resolve, reject) => {
      EMP.find({ employee_department_name: { $eq: accountName } }, usersProjection, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },
  getTotalWorkingHour: () => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    return new Promise((resolve, reject) => {
      EMP.find({}, usersProjection).count({}, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },

  getTotalEmployeeCount: () => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    return new Promise((resolve, reject) => {
      EMP.find({}, usersProjection, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },
  // Projects  EMPLOYEE_OU_NAME
  getAllProjects: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString = "employee_ou_name";
    return new Promise((resolve, reject) => {
      // data === "B"
      //   ? (queryString = "Billable")
      //   : (queryString = "Non Billable");
      EMP.distinct("employee_ou_name").count({}, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },

  // getSummeryArray
  getSummeryArray: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString;
    return new Promise((resolve, reject) => {
      data === "B"
        ? (queryString = "Billable")
        : (queryString = "Non Billable");
      EMP.find({ master1: queryString }, usersProjection, function (
        err,
        foods
      ) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },

  // Billable hours
  getTotalBillableHour: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString;
    return new Promise((resolve, reject) => {
      data === "B"
        ? (queryString = "Billable")
        : (queryString = "Non Billable");
      EMP.find({ master1: queryString }, usersProjection).count({}, function (
        err,
        foods
      ) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },

  getTotalAccounts: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString = "employee_department_name";
    return new Promise((resolve, reject) => {
      // data === "B"
      //   ? (queryString = "Billable")
      //   : (queryString = "Non Billable");
      EMP.distinct("employee_department_name").count({}, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
    }).catch((err) => reject(err));
  },
  // graphData
  getGraphData: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString = "employee_department_name";
    return new Promise((resolve, reject) => {
      let billable = [];
      let nonBillable = [];
      let dataToSend = [];
      // data === "B"
      //   ? (queryString = "Billable")
      //   : (queryString = "Non Billable");
      // EMP.createIndex({ master1: 1, employee_department_name: 1 });
      EMP.aggregate(
        [
          { $match: { master1: "Billable" } },
          {
            $group: {
              _id: "$employee_department_name",
              billableCount: { $sum: 1 },
            },
          },
        ],
        async function (err, foods) {
          if (err) resolve(err);
          billable = await foods;

          EMP.aggregate(
            [
              { $match: { master1: "Non Billable" } },
              {
                $group: {
                  _id: "$employee_department_name",
                  nonBillableCount: { $sum: 1 },
                },
              },
            ],
            async function (err, foods) {
              if (err) resolve(err);
              // resolve(foods);
              nonBillable = await foods;
              // dataToSend = [...billable, ...nonBillable];
              const mergeByProperty = async (target, source, prop) => {
                source.forEach((sourceElement) => {
                  let targetElement = target.find((targetElement) => {
                    return sourceElement[prop] === targetElement[prop];
                  });
                  targetElement
                    ? Object.assign(targetElement, sourceElement)
                    : target.push(sourceElement);
                });
              };
              // var target /* arr1 */ = [{name: "lang", value: "English"}, {name: "age", value: "18"}];
              // var source /* arr2 */ = [{name : "childs", value: '5'}, {name: "lang", value: "German"}];

              mergeByProperty(billable, nonBillable, "_id");

              // console.log(target)
              // Array.prototype.push.apply(billable, nonBillable);
              resolve(billable);
            }
          );
          // resolve(foods);
        }
      );
    }).catch((err) => reject(err));
  },

  // getPracticeGraphData
  getPracticeGraphData: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString = "employee_department_name";
    return new Promise((resolve, reject) => {
      let billable = [];
      let nonBillable = [];
      let dataToSend = [];
      // data === "B"
      //   ? (queryString = "Billable")
      //   : (queryString = "Non Billable");
      // EMP.createIndex({ master1: 1, employee_department_name: 1 });
      EMP.aggregate(
        [
          // { $match: { master1: "Billable" } },
          {
            $group: {
              _id: "$master3",
              count: { $sum: 1 },
            },
          },
        ],
        async function (err, foods) {
          if (err) resolve(err);
          // billable = await foods;
          resolve(foods);
        }
      );
      // EMP.aggregate(
      //   [
      //     { $match: { master1: "Non Billable" } },
      //     {
      //       $group: {
      //         _id: "$employee_department_name",
      //         nonBillableCount: { $sum: 1 },
      //       },
      //     },
      //   ],
      //   async function (err, foods) {
      //     if (err) resolve(err);
      //     // resolve(foods);
      //     nonBillable = await foods;
      //     // dataToSend = [...billable, ...nonBillable];
      //     const mergeByProperty = async (target, source, prop) => {
      //       source.forEach((sourceElement) => {
      //         let targetElement = target.find((targetElement) => {
      //           return sourceElement[prop] === targetElement[prop];
      //         });
      //         targetElement
      //           ? Object.assign(targetElement, sourceElement)
      //           : target.push(sourceElement);
      //       });
      //     };
      //     // var target /* arr1 */ = [{name: "lang", value: "English"}, {name: "age", value: "18"}];
      //     // var source /* arr2 */ = [{name : "childs", value: '5'}, {name: "lang", value: "German"}];

      //     mergeByProperty(billable, nonBillable, "_id");

      //     // console.log(target)
      //     // Array.prototype.push.apply(billable, nonBillable);
      //     resolve(billable);
      //   }
      // );
    }).catch((err) => reject(err));
  },
  // getAllPractices

  getAllPractices: (data) => {
    var usersProjection = {
      __v: false,
      createdBy: false,
    };
    let queryString = "master3";
    return new Promise((resolve, reject) => {
      // data === "B"
      //   ? (queryString = "Billable")
      //   : (queryString = "Non Billable");
      EMP.distinct("master3").count({}, function (err, foods) {
        if (err) resolve(err);
        resolve(foods);
      });
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
  getProfileMatchBattery: (data) => { },
};
