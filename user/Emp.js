var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var EmpSchema = new mongoose.Schema({
  master1: String,
  employee_employee_id: String,
  employee_date_of_joining: String,
  employee_mail_id: String,
  personal_gender: String,
  employee_ou_name: String,
  employee_grade_name: String,
  employee_designation_name: String,
  master3: String,
  employee_functional_reporting_to: String,
  employee_department_name: String,
  ou_company: String,
  employee_reporting_to: String,
});
EmpSchema.plugin(uniqueValidator);
mongoose.model("Emp", EmpSchema);

module.exports = mongoose.model("Emp");
