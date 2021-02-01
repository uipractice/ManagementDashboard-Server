var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var TopFiveReasonSchema = new mongoose.Schema({

primaryreason: {type: String,default: ''},
secondaryreason: {type: String,default: ''},
voluntaryattrition:{type: Number,default: 0},
percentage :{type: String,default: ''},
},{ timestamps: true });
TopFiveReasonSchema.plugin(uniqueValidator);
mongoose.model("TopFiveReason", TopFiveReasonSchema);

module.exports = mongoose.model("TopFiveReason");
