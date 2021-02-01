var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var MaleFemaleRatioSchema = new mongoose.Schema({



month: {type: String,default: ''},
total:{type: Number,default: 0},
male:{type: Number,default: 0},
malepercentage:{type: String,default: ''},
female:{type: Number,default: 0},
femalepercentage:{type: String,default: ''},



  
},{ timestamps: true });
MaleFemaleRatioSchema.plugin(uniqueValidator);
mongoose.model("MaleFemaleRatio", MaleFemaleRatioSchema);

module.exports = mongoose.model("MaleFemaleRatio");
