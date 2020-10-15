var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");
var multer = require("multer");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
// router.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var food = require("./EMP");
var foodHelper = require("./emp_helper");
var userHelper = require("../authValidation/userHelper");
var EMP = require("../user/Emp");
var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    var datetimestamp = Date.now();
    cb(
      null,
      file.fieldname +
        "-" +
        datetimestamp +
        "." +
        file.originalname.split(".")[file.originalname.split(".").length - 1]
    );
  },
});

var upload = multer({
  //multer settings

  storage: storage,
  fileFilter: function (req, file, callback) {
    //file filter
    if (
      ["xls", "xlsx"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      console.log("multer called");
      return callback(new Error("Wrong extension type"));
    } else {
      console.log("multer called");
    }
    callback(null, true);
  },
}).single("file");

// CREATES A NEW food

router.get("/demo", async function (req, res) {
  res.send("success");
});

router.post("/ui", async function (req, res) {
  console.log(req.body);
  res.status(200).send({
    statusCode: 200,
    result: `Hi ${req.body.Name} welcome to UI Practice`,
  });
});
router.post("/emp", async function (req, res) {
  //   console.log(req);
  // await userHelper.getUserDetails(req.userId).then((user) => {
  //   console.log(user);
  //   if (user.statusCode === 200) {
  foodHelper.createfood(req.body).then((response) => {
    console.log(response);
    res.status(200).send(response);
  });
  // } else {
  //   res
  //     .status(200)
  //     .send({ message: "please login and create food", statusCode: 401 });
  // }
  // });
});

// RETURNS ALL THE foods IN THE DATABASE
router.get("/getAllEmp", async function (req, res) {
  await foodHelper.getAllfoods().then((response) => {
    res.status(200).send(response);
  });
});
router.get("/getAllEmployees", async function (req, res) {
  await foodHelper.getAllEmployees().then((response) => {
    res.status(200).send(response);
  });
});

router.get("/getTotalWorkingHour", async function (req, res) {
  await foodHelper.getTotalWorkingHour().then((response) => {
    res
      .status(200)
      .send({ statusCode: 200, workingHour: response.length * 8 + "Hrs" });
  });
});
router.get("/getTotalEmployeeCount", VerifyToken, async function (req, res) {
  await foodHelper.getTotalWorkingHour().then((response) => {
    res.status(200).send({ statusCode: 200, count: response.length });
  });
});

router.get("/getAccountGraphData", VerifyToken, async function (req, res) {
  await foodHelper.getGraphData().then((response) => {
    console.log("Captured DATA from backend");
    res
      .status(200)
      .send({ statusCode: 200, data: response, count: response.length });
  });
});

router.get("/getPracticeGraphData", VerifyToken, async function (req, res) {
  await foodHelper.getPracticeGraphData().then((response) => {
    console.log("Captured DATA from backend");
    res
      .status(200)
      .send({ statusCode: 200, data: response, count: response.length });
  });
});

// getAllCounts

router.get("/getAllCounts", VerifyToken, async function (req, res) {
  let result = {};
  let data = [];
  await foodHelper.getTotalWorkingHour().then((response) => {
    result.workingHour = response.length * 8;
    result.totalEmployees = response.length;
    data.push({
      title: "Total Employees",
      count: response.length,
      flag: 1,
      staticAvailable: false,
      icon: "total_employee.svg",
    });
    // res.status(200).send({ statusCode: 200, count: response.length });
  });

  await foodHelper.getTotalBillableHour("B").then((response) => {
    result.billingHour = response.length * 8;
    result.billingCount = response.length;
    data.push({
      title: "Billing Hour",
      count: response.length * 8 * 22,
      flag: 1,
      staticAvailable: false,
      icon: "Billable_hours.svg",
    });
  });
  // await foodHelper.getSummeryArray().then((response) => {
  //   result.data = response;
  // });

  await foodHelper.getTotalBillableHour("NB").then((response) => {
    result.nonBillingHour = response.length * 8;
    result.nonBillingCount = response.length;
    data.push({
      title: "Non Billing Hour",
      count: response.length * 8 * 22,
      flag: 1,
      staticAvailable: false,
      icon: "Billable_hours.svg",
    });
  });
  await foodHelper.getTotalAccounts().then((response) => {
    (result.totalAccountCount = response.length),
      (result.totalAccounts = response);
    data.push({
      title: "Accounts",
      count: response.length,
      flag: 1,
      staticAvailable: false,
      icon: "Accounts.svg",
    });
  });

  await foodHelper.getAllProjects().then((response) => {
    (result.totalProjectsCount = response.length),
      (result.totalProjects = response);
    data.push({
      title: "Projects",
      count: response.length,
      flag: 1,
      staticAvailable: false,
      icon: "Project.svg",
    });
  });

  await foodHelper.getAllPractices().then((response) => {
    (result.totalPracticeCount = response.length),
      (result.totalPractice = response);
    // data.push({
    //   title: "Practices",
    //   count: response.length,
    //   flag: 1,
    //   staticAvailable: false,
    //   icon: "Practices.svg",
    // });
  });

  res.status(200).send({ statusCode: 200, data: { result, data } });
});

// Billable hours
// getTotalBillableHour
router.get("/getTotalBillableHour", async function (req, res) {
  await foodHelper.getTotalBillableHour("B").then((response) => {
    res.status(200).send({ statusCode: 200, data: response.length * 8 });
  });
});

router.get("/getTotaNonBillableHour", async function (req, res) {
  await foodHelper.getTotalBillableHour("NB").then((response) => {
    res.status(200).send({ statusCode: 200, data: response.length * 8 });
  });
});

// get Accounts
router.get("/getTotalAccounts", async function (req, res) {
  await foodHelper.getTotalAccounts().then((response) => {
    res
      .status(200)
      .send({ statusCode: 200, count: response.length, data: response });
  });
});
// getAllProjects
router.get("/getAllProjects", async function (req, res) {
  await foodHelper.getAllProjects().then((response) => {
    res.status(200).send({
      statusCode: 200,

      count: response.length,
      data: response,
    });
  });
});

// getAllPractices

router.get("/getAllPractices", async function (req, res) {
  await foodHelper.getAllPractices().then((response) => {
    res
      .status(200)
      .send({ statusCode: 200, count: response.length, data: response });
  });
});

// GETS A SINGLE food FROM THE DATABASE
// router.get("/getfood/:id", VerifyToken, async function (req, res) {
//   await foodHelper.getfoodById(req.params.id).then((response) => {
//     res.status(200).send(response);
//   });
// });

// SEARCH

router.get("/search/:id", VerifyToken, async function (req, res) {
  await foodHelper.searchSkills(req.params.id).then((response) => {
    res.status(200).send(response);
  });
});

router.get("/check", async function (req, res) {
  res.send("hi");
});

// DELETES A food FROM THE DATABASE
router.delete("/deleteEmp/:id", async function (req, res) {
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
router.put("/updateEmp/:id", VerifyToken, async function (req, res) {
  await foodHelper.updatefood(req.params.id, req.body).then((response) => {
    if (response.statusCode === 200) {
      res.status(200).send(response);
    } else {
      res.status(500).send(response);
    }
  });
});

router.post("/searchwithlocation", VerifyToken, async function (req, res) {
  console.log(req.body);
  await foodHelper
    .searchwithLocation(req.body.text, req.body.location)
    .then((response) => {
      res.status(200).send(response);
    });
});

router.post("/getProfileMatchPercentage", VerifyToken, async function (
  req,
  res
) {
  console.log(req.body);
  await foodHelper.getProfileMatchBattery(body).then((response) => {
    res.status(200).send(response);
  });
});

// Convert the excel sheet to JSON
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
/** API path that will upload the files */
router.post("/upload", function (req, res) {
  // res.send("FIle called");

  var exceltojson;

  upload(req, res, function (err) {
    console.log("called multer");
    // console.log(res, req, err);
    if (err) {
      res.json({ error_code: 1, err_desc: err });
      return;
    }
    /** Multer gives us file info in req.file object */
    if (!req.file) {
      res.json({ error_code: 1, err_desc: "No file passed" });
      return;
    }
    /** Check the extension of the incoming file and
     *  use the appropriate module
     */
    if (
      req.file.originalname.split(".")[
        req.file.originalname.split(".").length - 1
      ] === "xlsx"
    ) {
      exceltojson = xlsxtojson;
    } else {
      exceltojson = xlstojson;
    }
    console.log(req.file.path);
    try {
      exceltojson(
        {
          input: req.file.path,
          output: null, //since we don't need output.json
          lowerCaseHeaders: true,
          sheets: ["sheet2"],
        },
        function (err, result) {
          if (err) {
            return res.json({ error_code: 1, err_desc: err, data: null });
          }

          // console.log(req.body);

          try {
            result.map((val) => {
              // console.log(val);
              EMP.create(val, function (err, emp) {
                if (err)
                  return res.status(500).send({
                    message: "you are allready added",
                    statusCode: "500",
                  });

                // return the information including token as JSON
              });
            });
          } catch (e) {
            console.log(e);
            // res.send(e);
          }
          // console.log(result);
          res.json({ error_code: 0, err_desc: null, data: result });
        }
      );
    } catch (e) {
      res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
  });
});

// router.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

module.exports = router;
