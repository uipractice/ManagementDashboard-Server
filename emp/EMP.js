var mongoose = require("mongoose");
var empSchema = new mongoose.Schema({
  EV_empID: String,
  EV_firstName: String,
  EV_lastName: String,
  EV_DOB: String,
  EV_gender: String,
  EV_phoneNo: String,
  EV_address: String,
  EV_state: String,
  EV_city: String,
  EV_DOJ: String,
  EV_email: String,
  EV_OUName: String,
  EV_Grade: String,
  EV_status: String,
  EV_designation: String,
  EV_master3: String,
  EV_reportingTo: String,
  EV_deptName: String,
  EV_OUCompany: String,
  EV_reportingToSec: String,
  EV_timeStamp: Date,
});
// db.deals.ensureIndex({ name: "text", description: "text", category: "text" });
// empSchema.index(
//   { role: "text", skillset: "text" },
//   { weights: { role: 1, skillset: 2 } }
// );
mongoose.model("EMP_DETAILS", empSchema);

module.exports = mongoose.model("EMP_DETAILS");
