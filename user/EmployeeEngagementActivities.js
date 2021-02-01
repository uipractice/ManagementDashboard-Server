var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var EmployeeEngagementActivitiesSchema = new mongoose.Schema({

activities: {type: String,default: ''},
count:{type: Number,default: 0},
eventheighlight:{type: String,default: ''},
  
},{ timestamps: true });
EmployeeEngagementActivitiesSchema.plugin(uniqueValidator);
mongoose.model("EmployeeEngagementActivities", EmployeeEngagementActivitiesSchema);

module.exports = mongoose.model("EmployeeEngagementActivities");
