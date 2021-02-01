var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require("../user/User");
var HR=require("../user/Hr")
var Foodd=require("./HR")
let foodPerticularData = [];
module.exports = {
  
 
  getHeaderData:() => {
    return new Promise((resovle, reject) => {
      HR.find({}, function(err, result){
        console.log(JSON.stringify(result));

        if(err){

            console.log("error query");
            reject(err);

        }else{

           resovle(JSON.stringify(result));

        }

    }).limit(1).sort({'_id':-1})


    })
    
    

  },

 
};
