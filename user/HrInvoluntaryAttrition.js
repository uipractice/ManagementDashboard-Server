var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var HrInvoluntarySchema = new mongoose.Schema({

    monthofleaving: {type: String,default: ''},
    bgvfailure:{type: Number,default: 0},
    bgvfailurepercentage :{type: String,default: ''},
    displinaryissues :{type: Number,default: 0},
    displinaryissuespercentage:{type: String,default: ''},
    lackofsuitableproject:{type: Number,default:0},
    lackofsuitableprojectpercentage:{type: String,default: ''},
    performanceissues:{type: Number,default: 0},
    performanceissuespercentage:{type: String,default: ''},


},{ timestamps: true });
HrInvoluntarySchema.plugin(uniqueValidator);
mongoose.model("HrInvoluntary", HrInvoluntarySchema);

module.exports = mongoose.model("HrInvoluntary");
