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
        '30_Employee Count':"employeecount30days",
        '30_Employee Connected' :"employeeconnected30days",
        '30_Whats going good' :"whatsgoinggood30days",
        '30_Scope of Improvement':"scopeofimprovement30days",
        '90_Employee Count' :"employeecount90days",
        '90_Employee Connected' :"employeeconnected90days",
        '90_Whats going good':"whatsgoinggood90days",
        '90_Scope of Improvement' :"scopeofimprovement90days"

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
        'BCG_Better Compensation': "bettercompensation",
        'BCG_Technology exposure': "technologyexposure",
        'BCG_Better Role': "betterrole",
        'BCG_Onsite Oppurtunity': "onsiteoppurtunity",
        'BCG_Entrepreneurship': "entrepreneurship",
        'BCG_Better Company': "bettercompany",
        'BCG_Total': "totalbcg",
        'WE_job Dissatisafaction ': "jobdissatisafaction",
        'WE_Team issues': "teamissues",
        'WE_Manager Issues': "managerissues",
        'WE_Job security': "jobsecurity",
        'WE_Timings': "timings",
        'WE_Total': "totalwe",
        'PR_Family care': "familycare",
        'PR_Relocation': "relocation",
        'PR_Health Issues ': "healthissues",
        'PR_Higher Education': "highereducation",
        'PR_Career Break': "careerbreak",
        'PR_Total': "totalpr",

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
      const PostOnnBordingEngagementArray = changeKeyObjects(result['Post on-bording engagement'], PostOnnBordingEngagementReplaceKeys);
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


    res.json({result,response:{headCountresponse,accountwiseresponse,voluntaryattritionresponse,involuntaryattritionresponse,topfivereasonresponse,employementengagementactivitiesresponse,postonboardingresponse}})

    } catch (e) {
      res.json({ error_code: 1, err_desc: "Corupted excel file" });
    }
  });
});

router.get("/getOnboardedSeperatedgraphData",async function(req,res){
  let finalArray = [];
  await hrHelper.getOnboardedSeperatedgraphData().then(response => {
    const resp = JSON.parse(response)
    finalArray.push(resp)
  })
  res.status(200).send(finalArray);
});

router.get("/getEmployeeAttritiongraphData", async function(req,res){
  let finalArray = [];

  await hrHelper.getEmployeeAttritiongraphData().then(response => {
    const resp = JSON.parse(response)
    finalArray.push(resp)
  })

  res.status(200).send(finalArray);

});

router.get("/getHeaderData",   async function (req, res) {

  let result = {};
  let finalArray = [];

  await hrHelper.getHeaderData().then(response => {

    const iconArray=['people.svg','onboarded.svg','Seperated.svg','billable.svg','non-billable.svg']
    const resp = JSON.parse(response);


    Object.keys(resp).forEach(key => {
      let obj = {title: '',count:'', flag:1, staticAvailable: false, icon: ''}

      obj.title = key;
      obj.count = resp[key];

      finalArray.push(obj);
    })
    for (i in finalArray) {
      finalArray[i].icon = iconArray[i];
    }

    finalArray = finalArray.filter(function( obj ) {
      return obj.title !== '_id';
  });

  })

  await hrHelper.getBillable().then((response) => {
    
    finalArray.push({
      title: "Billable",
      count: response,
      flag: 1,
      staticAvailable: false,
      icon: "billable.svg",
    });
  });

  await hrHelper.getNonBillable().then((response) => {
    finalArray.push({
      title: "Non Billable",
      count: response,
      flag: 1,
      staticAvailable: false,
      icon: "non-billable.svg",
    });
  });
  res.status(200).send(finalArray);
});

router.get("/getDemographicsgraphData",  async function (req, res) {
var finalArray=[]

   await hrHelper.getDemographicsgraphData().then(response => {

    const resp = JSON.parse(response)
    finalArray.push(resp)
  })
  res.status(200).send(finalArray);



});

router.get("/getTopThreeReason",  async function (req, res) {
  var finalArray=[]
     await hrHelper.getTopThreeReasonData().then(response => {
  
      const resp = JSON.parse(response)
      finalArray= resp
    })
    res.status(200).send(finalArray);
  });
  
router.get("/getEmployeeAttrition",  async function (req, res) {
    var finalArray=[]
       await hrHelper.getEmployeeAttritionData().then(response => {
        const resp = JSON.parse(response)
        finalArray= resp
      })
      res.status(200).send(finalArray);
    });
router.get("/getEmployeeEngagement",  async function (req, res) {
      var finalArray=[]
         await hrHelper.getEmployeeEngagementData().then(response => {
          const resp = JSON.parse(response)
          finalArray= resp
        })
        res.status(200).send(finalArray);
      });
router.get("/getPostEngagement",  async function (req, res) {
        var finalArray=[]
           await hrHelper.get30DaysPostEngagementData().then(response => {
            const resp = JSON.parse(response)
            const lastItem = [resp[resp.length - 1]]
            finalArray.push({
              title: "30Days",
              data: lastItem
            })
          })
          await hrHelper.get90DaysPostEngagementData().then((response) => {
            const resp = JSON.parse(response)
            const lastItem = [resp[resp.length - 1]]
              finalArray.push({
                title: "90Days",
                data: lastItem
              })
          });
          res.status(200).send(finalArray);
        });
router.get("/getVoluntaryAttritionData",  async function (req, res) {
  transFormData = (subData) => {
    let result = []
    subData.map((item) => {
      let allKeys = Object.keys(item);
      let allValues = Object.values(item);
      allKeys.forEach((item, index) => {
        let obj = {};
        obj['name'] = item;
        obj['value'] = allValues[index];
        result.push(obj);
      })
    });
    return result;
  }
          var finalArray=[]
             await hrHelper.getBetterCareerGrowthData().then(response => {
              const resp = JSON.parse(response)
              const lastItem = [resp[resp.length - 1]]
              finalArray.push({
                resion: "Better Career Growth",
                totalcount: lastItem[0].totalbcg,
                subdata: transFormData(lastItem)
              })
            })
            await hrHelper.getWorkEnviornmentData().then(response => {
              const resp = JSON.parse(response)
              const lastItem = [resp[resp.length - 1]]
              finalArray.push({
                resion: "Work Enviornment",
                totalcount: lastItem[0].totalwe,
                subdata: transFormData(lastItem)
              })
            })
            await hrHelper.getPersonalReasonsData().then(response => {
              const resp = JSON.parse(response)
              const lastItem = [resp[resp.length - 1]]
              finalArray.push({
                resion: "Personal Reasons",
                totalcount: lastItem[0].totalpr,
                subdata: transFormData(lastItem)
              })
            })
            res.status(200).send(finalArray);
          });
  

module.exports = router;
