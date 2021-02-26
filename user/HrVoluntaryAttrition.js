var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var HrVoluntarySchema = new mongoose.Schema({
    months: {type: String,default: ''},
    bettercompensation:{type: Number,default: 0},
    technologyexposure:{type: Number,default: 0},
    betterrole:{type: Number,default: 0},
    onsiteoppurtunity:{type: Number,default: 0},
    entrepreneurship:{type: Number,default: 0},
    bettercompany:{type: Number,default: 0},
    totalbcg:{type: Number,default: 0},
    jobdissatisafaction:{type: Number,default: 0},
    teamissues:{type: Number,default: 0},
    managerissues:{type: Number,default: 0},
    jobsecurity:{type: Number,default: 0},
    timings:{type: Number,default: 0},
    totalwe:{type: Number,default: 0},
    familycare:{type: Number,default: 0},
    relocation:{type: Number,default: 0},
    healthissues:{type: Number,default: 0},
    highereducation:{type: Number,default: 0},
    careerbreak:{type: Number,default: 0},
    totalpr:{type: Number,default: 0}







  
},{ timestamps: true });
HrVoluntarySchema.plugin(uniqueValidator);
mongoose.model("HrVoluntary", HrVoluntarySchema);

module.exports = mongoose.model("HrVoluntary");
