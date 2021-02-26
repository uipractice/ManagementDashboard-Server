var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var HR=require("../user/Hr")
var EMP=require("../user/Emp")
var HrAccount=require("../user/HrAccountAtrrition")
var TopThreeReason=require("../user/Topfivereason");
const EMPENGAGEMENT=require("../user/EmployeeEngagementActivities");
const POSTEMPENGAGEMENT=require("../user/PostOnboardingEng");
const VOLUNTARYANALYSIS=require("../user/HrVoluntaryAttrition");
var  sendresult=[]

module.exports = {

  getEmployeeAttritiongraphData:()=>{
    return new Promise((resovle, reject) => {
      HrAccount.find({},{_id:0,account:1,attrition:1} ,function(err, result){
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(JSON.stringify(result));
        }
    })
    })
  },

  getOnboardedSeperatedgraphData:()=>{
    return new Promise((resovle, reject) => {

      HR.find({},
        {_id:0,month: 1, Onboarded: 1, Seperated: 1}, function(err, result){
          if(err){
              console.log("error query",err);
              reject(err);
  
          }else{
             resovle(JSON.stringify(result));
          }
      })
    })
  },

  getBillable:()=>{
    return new Promise((resovle, reject) => {
      EMP.countDocuments( {master1:"Billable"},function(err,result){
        if(err){

          console.log("error query");
          reject(err);

      }else{
       

         resovle(result);

      }
  
      } )

    })

  },

  getNonBillable:()=>{

    return new Promise((resovle, reject) => {
      EMP.countDocuments( {master1:"Non Billable"  },function(err,result){
        if(err){

          console.log("error query");
          reject(err);

      }else{
       

         resovle(result);

      }
  
      } )

    })
  },

  getDemographicsgraphData:()=>{
    return new Promise((resovle, reject) => {
      HR.find({ },
        {_id:0,month: 1, closingbalance: 1}, function(err, result){

          if(err){
              reject(err);
  
          }else{
  
             resovle(JSON.stringify(result));
  
          }
  
      })

    })

  },
 
  getHeaderData:() => {
    return new Promise((resovle, reject) => {
  
      HR.findOne({ },
      {  HeadCount: 1, Onboarded: 1,Seperated:1}, function(err, result){
 
        sendresult=JSON.stringify(result)
        if(err){

            console.log("error query");
            reject(err);

        }else{

           resovle(sendresult);
        }

    }).limit(1).sort({'_id':-1})
    })
  },

  getTopThreeReasonData:() => {
    return new Promise((resovle, reject) => {
      TopThreeReason.find({ },
      {_id:0, secondaryreason:1, voluntaryattrition:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  getEmployeeAttritionData:() => {
    return new Promise((resovle, reject) => {
      HR.find({ },
      {_id:0, month:1, Seperated:1,voluntary:1,involuntary:1,absconding:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  getEmployeeEngagementData:() => {
    return new Promise((resovle, reject) => {
      EMPENGAGEMENT.find({ },
      {_id:0,activities:1,count:1,eventheighlight:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  get30DaysPostEngagementData:() => {
    return new Promise((resovle, reject) => {
      POSTEMPENGAGEMENT.find({ },
      {_id:0,month:1,employeecount30days:1,employeeconnected30days:1,whatsgoinggood30days:1,
        scopeofimprovement30days:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  get90DaysPostEngagementData:() => {
    return new Promise((resovle, reject) => {
      POSTEMPENGAGEMENT.find({ },
      {_id:0,month:1,employeecount90days:1,employeeconnected90days:1,whatsgoinggood90days:1,
        scopeofimprovement90days:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  getBetterCareerGrowthData:() => {
    return new Promise((resovle, reject) => {
      VOLUNTARYANALYSIS.find({ },
      {_id:0,bettercompensation:1,technologyexposure:1,betterrole:1,onsiteoppurtunity:1,
        entrepreneurship:1,bettercompany:1,totalbcg:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  getWorkEnviornmentData:() => {
    return new Promise((resovle, reject) => {
      VOLUNTARYANALYSIS.find({ },
      {_id:0,jobdissatisafaction:1,teamissues:1,managerissues:1,jobsecurity:1,
        timings:1,totalwe:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
  getPersonalReasonsData:() => {
    return new Promise((resovle, reject) => {
      VOLUNTARYANALYSIS.find({ },
      {_id:0,familycare:1,relocation:1,healthissues:1,highereducation:1,
        careerbreak:1,totalpr:1}, function(err, result){
        sendresult=JSON.stringify(result)
        if(err){
            console.log("error query");
            reject(err);
        }else{
           resovle(sendresult);
        }
    })
    })
  },
 
 
};
