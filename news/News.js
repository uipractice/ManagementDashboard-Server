var mongoose = require("mongoose");
var NewsSchema = new mongoose.Schema({
  // NotitificationData: Object,
  date: {type: String,default: ''},
  messageType: {type: String,default: ''},
  messageDescription: {type: String,default: ''},
  publish: {type: Boolean},
  isActive: {type: Boolean},
  deptId: {type: String, default:''},
  timeStamp: Date,
});
// db.deals.ensureIndex({ name: "text", description: "text", category: "text" });
// foodSchema.index(
//   { role: "text", skillset: "text" },
//   { weights: { role: 1, skillset: 2 } }
// );
mongoose.model("News", NewsSchema);

module.exports = mongoose.model("News");
