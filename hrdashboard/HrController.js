var express = require("express");
var app = express();
var router = express.Router();
var bodyParser = require("body-parser");

var VerifyToken = require("../auth/VerifyToken");
var multer = require("multer");
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");
const xltoJSON = require("convert-excel-to-json");
const fs = require('fs');
var hrHelper=require("./hr_helper")

const changeKeyObjects = (arr, replaceKeys) => {
  if (arr && arr.length > 0) {
    return arr.map(item => {
      const newItem = {};
      Object.keys(item).forEach(key => {
        newItem[replaceKeys[key]] = item[[key]];
      });
      return newItem;
    });
  }

  return [];

};

// router.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const HR = require("../user/Hr")
const HRACCOUNT = require("../user/HrAccountAtrrition")
const HRVOLUNTARY=require("../user/HrVoluntaryAttrition");
const HrInvoluntaryAttrition = require("../user/HrInvoluntaryAttrition");
const TopFiveReason=require("../user/Topfivereason");
const EmployeeEngagementActivities=require("../user/EmployeeEngagementActivities");
const PostOnBoardEng=require("../user/PostOnboardingEng");
const MaleFemaleRatio=require("../user/MaleFemaleRatio")

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


// Convert the excel sheet to JSON
router.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
/** API path that will upload the files */
router.post("/upload", function (req, res) {
  var exceltojson;

  upload(req, res, async function (err) {
    console.log("called multer");
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
      const filePath = `./${req.file.path.replace('\\', '/')}`
      console.log(filePath);
      const result = await xltoJSON({
        sourceFile: filePath,

        header: {
          rows: 1
        },

        columnToKey: {
          '*': '{{columnHeader}}'
        }


      //   sheets:[{
      //     name: 'sheet1',
      //     header:{
      //         rows: 1
      //     },
      //     columnToKey: {
      //       A: 'id',
      //     B: 'ProductName'
      //     }
      // },{
      //     name: 'sheet2',
      //     header:{
      //         rows: 3
      //     },
      //     columnToKey: {
      //       A: 'id',
      //     B: 'ProductDescription'
      //     }
      //   }]
      });

       const PostOnnBordingEngagementReplaceKeys={
        Months:"month",
        'Employee Count':"employeecount",
        'Employee Connected' :"employeeconnected",
        'Whats going good' :"whatsgoinggood",
        'Scope of Improvement':"scopeofimprovement",
        'Employee Count' :"employeecount",
        'Employee Connected' :"employeeconnected",
        'Whats going good':"whatsgoinggood",
        'Scope of Improvement' :"scopeofimprovement"




       }


      const MaleFemaleRatioReplaceKeys={
        Month:"month",
        Total:"total",
        Male:"male",
        'Male %': 'malepercentage',
        Female:"female",
        'Feamle %':"femalepercentage"

      }

      const EmployeeEngagementActivitiesReplaceKeys= {
        Activities :"activities",
        Count : "count",
        'Event Heighlight':"eventheighlight"


      }


      const TopfiveReasonReplacekeys ={
        'Primary Reason' :"primaryreason",
        'Secondary Reason' :"secondaryreason",
        'Voluntary Attrition' :"voluntaryattrition",
        'Percentage' : "percentage"


      }

      const InvoluntaaryAttritionReplaceKeys = {
        'Month of leaving': "monthofleaving",
        'BGV Failure ': "bgvfailure",
        'BGV Failure %': "bgvfailurepercentage",
        'Displinary issues': "displinaryissues",
        'Displinary issues %': "displinaryissuespercentage",
        'Lack Of Suitable Project': "lackofsuitableproject",
        'Lack Of Suitable Project %': "lackofsuitableprojectpercentage",
        'Performance Issues': "performanceissues",
        'Performance Issues %': "performanceissuespercentage",
      };

      const VoluntaryAttritionAnalysisReplaceKeys = {
        Months: "months",
        'Better Compensation': "bettercompensation",
        'Technology exposure': "technologyexposure",
        'Better Role': "betterrole",
        'Onsite Oppurtunity': "onsiteoppurtunity",
        Entrepreneurship: "entrepreneurship",
        'Better Company': "bettercompany",
        'job Dissatisafaction': "jobdissatisafaction",
        'Team issues': "teamissues",
        'Manager Issues': "managerissues",
        'Job security': "jobsecurity",
        Timings: "timings",
        'Family care': "familycare",
        relocation: "relocation",
        'Health Issues': "healthissues",
        'Higher Education': "highereducation",
        'Career Break': "careerbreak"

      };

      const accountWiseAttritionreplaceKeys = {
        Account: 'account',
        'Head Count': "headcount",
        'Voluntary Attrition %': "voluntaryattrition",
        'Atrrition %': "attrition"
      };

      const headCountReplaceKeys = {
        Month: "month", 'Head Count': "HeadCount", Onboarded: "Onboarded",
        'Overall Sep/   Total Attrition': "Seperated",
        'Total Attrition %': "totalattrition",
        Voluntary: "voluntary",
        'Voluntary Attrition %': "voluntaryattrition",
        Involuntary: "involuntary",
        Absconding: "absconding",
        'Closing balance': "closingbalance"
      };

      const headcountArray = changeKeyObjects(result['Head Count'], headCountReplaceKeys);
      const accountwiseArray = changeKeyObjects(result['Account-Wise Atrrition'], accountWiseAttritionreplaceKeys);
      const voluntaryattritionArray = changeKeyObjects(result['Voluntary Attrition Anlaysis'], VoluntaryAttritionAnalysisReplaceKeys);
      const involuntaryattritionArray = changeKeyObjects(result['Involuntary Attrition'], InvoluntaaryAttritionReplaceKeys);
      const TopfiveReasonArray = changeKeyObjects(result['Top 5 Reason'], TopfiveReasonReplacekeys);
      const PostOnnBordingEngagementArray = changeKeyObjects(result['Top 5 Reason'], PostOnnBordingEngagementReplaceKeys);
      const MaleFemaleRatioArray = changeKeyObjects(result['Top 5 Reason'], MaleFemaleRatioReplaceKeys);
      const EmployeeEngagementActivitiesArray = changeKeyObjects(result['Employee engagement Activities'], EmployeeEngagementActivitiesReplaceKeys);
      let headCountresponse, accountwiseresponse, voluntaryattritionresponse,postonboardingresponse,malefemaleratioresponse, involuntaryattritionresponse  ,topfivereasonresponse , employementengagementactivitiesresponse= {}


      if (headcountArray.length > 0)
        headCountresponse = await HR.insertMany(headcountArray)
      if (accountwiseArray.length > 0)
        accountwiseresponse = await HRACCOUNT.insertMany(accountwiseArray)
      if (voluntaryattritionArray.length > 0)
        voluntaryattritionresponse = await HRVOLUNTARY.insertMany(voluntaryattritionArray)
      if (involuntaryattritionArray.length > 0)
        involuntaryattritionresponse = await HrInvoluntaryAttrition.insertMany(involuntaryattritionArray)
      if (TopfiveReasonArray.length > 0)
      topfivereasonresponse = await TopFiveReason.insertMany(TopfiveReasonArray)
      if (PostOnnBordingEngagementArray.length > 0)
      postonboardingresponse = await PostOnBoardEng.insertMany(PostOnnBordingEngagementArray)
      if (MaleFemaleRatioArray.length > 0)
      malefemaleratioresponse = await MaleFemaleRatio.insertMany(MaleFemaleRatioArray)
      if (EmployeeEngagementActivitiesArray.length > 0)
      employementengagementactivitiesresponse = await EmployeeEngagementActivities.insertMany(EmployeeEngagementActivitiesArray)


    res.json({result,response:{headCountresponse,accountwiseresponse,voluntaryattritionresponse,involuntaryattritionresponse,topfivereasonresponse,employementengagementactivitiesresponse,postonboardingresponse,postonboardingresponse}})





    } catch (e) {
      res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
  });
});

router.get("/getDemographicsgraphData",function(req,res){
  hrHelper.getDemographicsgraphData.then(response => {
    const finalArray = [];
    const resp = JSON.parse(response);
console.log(resp)



  })


})


router.get("/getOnboardedSeperatedgraphData",function(req,res){

  hrHelper.getOnboardedSeperatedgraph.then(response => {
    const resp = JSON.parse(response);

    console.log(resp,"resp")


  })



})

router.get("/getEmployeeAttritiongraphData",function(req,res){
  console.log("hiii")
  hrHelper.getEmployeeAttritiongraphData().then(response => {
    const resp = JSON.parse(response)
  }).then(resp => {
    res.status(200).send(resp);

  }).catch(error =>{
    console.log(error);
  })


})


router.get("/getHeaderData",  function (req, res) {
  hrHelper.getHeaderData().then(response => {
    const finalArray = [];
    const resp = JSON.parse(response);
    Object.keys(resp).forEach(key => {
      let obj = {title: '',count:'', flag:1, staticAvailable: false, icon: ''}

      obj.title = key;
      obj.count = resp[key]
      finalArray.push(obj);
    })
   return finalArray;
  }).then(result => {
    res.status(200).send(result);

  }).catch(error =>{
    console.log(error);
  })


});



module.exports = router;
