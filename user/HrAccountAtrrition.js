var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var HrAccountSchema = new mongoose.Schema({

account: {type: String,default: ''},
headcount:{type: Number,default: 0},
voluntaryattrition :{type: String,default: ''},
attrition :{type: String,default: ''},
},{ timestamps: true });
HrAccountSchema.plugin(uniqueValidator);
mongoose.model("HrAccount", HrAccountSchema);

module.exports = mongoose.model("HrAccount");
