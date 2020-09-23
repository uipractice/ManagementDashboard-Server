var mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
  registeredDate: Date,
  refreshToken: String,
  token: String,
  deviceToken: Object,
  mobileNumber: Number,
  connectInfo: Array,
  cartArray: [],
});
UserSchema.plugin(uniqueValidator);
mongoose.model("User", UserSchema);

module.exports = mongoose.model("User");
