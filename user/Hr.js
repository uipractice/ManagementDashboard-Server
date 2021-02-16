var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var HrSchemaHeadCount = new mongoose.Schema({

month: {type: String,default: ''},
HeadCount:{type: Number,default: 0},
Onboarded:{type: Number,default: 0},
Seperated:{type: Number,default:0},
totalattrition:{type: String,default: ''},
voluntary:{type: Number,default: 0},
voluntaryattrition:{type: String,default: ''},
involuntary:{type: Number,default: 0},
absconding:{type: Number,default: 0},
closingbalance:{type: Number,default: 0},

},{ timestamps: true });
HrSchemaHeadCount.plugin(uniqueValidator);
mongoose.model("Hr", HrSchemaHeadCount);

module.exports = mongoose.model("Hr");
