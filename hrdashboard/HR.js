var mongoose = require("mongoose");
var hrSchema = new mongoose.Schema({
  EV_empID: String,
  EV_timeStamp: Date,
});

mongoose.model("HR_DETAILS", hrSchema);

module.exports = mongoose.model("HR_DETAILS");
