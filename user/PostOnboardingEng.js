// var mongoose = require("mongoose");
// var uniqueValidator = require("mongoose-unique-validator");
// var PostOnBoardEngSchema = new mongoose.Schema({

// primaryreason: {type: String,default: ''},
// secondaryreason: {type: String,default: ''},
// voluntaryattrition:{type: Number,default: 0},
// percentage :{type: String,default: ''},
// },{ timestamps: true });
// PostOnBoardEngSchema.plugin(uniqueValidator);
// mongoose.model("PostOnBoardEng", PostOnBoardEngSchema);

// module.exports = mongoose.model("PostOnBoardEng");

var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var PostOnBoardEngSchema = new mongoose.Schema({

    month: {type: String,default: ''},
    employeecount30days: {type: Number,default: 0},
    employeeconnected30days: {type: Number,default: 0},
    whatsgoinggood30days:{type: String,default: ''},
    scopeofimprovement30days:{type: String,default: ''},
    employeecount90days: {type: Number,default: 0},
    employeeconnected90days: {type: Number,default: 0},
    whatsgoinggood90days:{type: String,default: ''},
    scopeofimprovement90days:{type: String,default: ''},
},{ timestamps: true });
PostOnBoardEngSchema.plugin(uniqueValidator);
mongoose.model("PostOnBoardEng", PostOnBoardEngSchema);

module.exports = mongoose.model("PostOnBoardEng");
