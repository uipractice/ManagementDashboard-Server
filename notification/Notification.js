var mongoose = require("mongoose");
var NotificationSchema = new mongoose.Schema({
  NotitificationData: Object,
  timeStamp: Date,
});
// db.deals.ensureIndex({ name: "text", description: "text", category: "text" });
// foodSchema.index(
//   { role: "text", skillset: "text" },
//   { weights: { role: 1, skillset: 2 } }
// );
mongoose.model("Notifications", NotificationSchema);

module.exports = mongoose.model("Notifications");
