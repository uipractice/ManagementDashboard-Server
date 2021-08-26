var app = require("./app");
const https = require('https');
const path = require('path');
const fs = require('fs');
var port = process.env.PORT || 80;

const sslserver = https.createServer({
  key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
}, app)
var server = sslserver.listen(port, function () {
  console.log("Express server listening on port " + port);
});
