var mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.MONGODB_CLIENT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
