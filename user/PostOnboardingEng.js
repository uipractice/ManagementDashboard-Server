var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var PostOnBoardEngSchema = new mongoose.Schema({

primaryreason: {type: String,default: ''},
secondaryreason: {type: String,default: ''},
voluntaryattrition:{type: Number,default: 0},
percentage :{type: String,default: ''},
},{ timestamps: true });
PostOnBoardEngSchema.plugin(uniqueValidator);
mongoose.model("PostOnBoardEng", PostOnBoardEngSchema);

module.exports = mongoose.model("PostOnBoardEng");
