var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var HR=require("../user/Hr")
var EMP=require("../user/Emp")
var HrAccount=require("../user/HrAccountAtrrition")
var Foodd=require("./HR")
let foodPerticularData = [];
var billable
var nonbillable
var  sendresult=[]

module.exports = {

  getEmployeeAttritiongraphData:()=>{
    console.log(hhhh);
    return new Promise((resovle, reject) => {
      HrAccount.find({}, function(err, result){
        console.log(JSON.stringify(result,"hhhh"));

        if(err){

            console.log("error query");
            reject(err);

        }else{

           resovle(JSON.stringify(result));

        }

    })

    })




  },


  getDemographicsgraphData:()=>{
    console.log("hiii")
    return new Promise((resovle, reject) => {
       HR.find({ },
        {  month: 1, closingbalance: 1}, function(err, result){
          console.log(JSON.stringify(result));
  
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
    console.log("hiiiii")
    return new Promise((resovle, reject) => {

   


    })

  },

  getBillable:()=>{
    return new Promise((resovle, reject) => {
      EMP.countDocuments( {master1:"Billable"  },function(err,result){
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

 
};
