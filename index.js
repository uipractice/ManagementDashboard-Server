var app = require("./app");
const https = require('https');
const path = require('path');
const fs = require('fs');

var port = process.env.PORT || 443;

var options ={
  key: fs.readFileSync(path.join(__dirname,'cert','key.pem')),
  cert: fs.readFileSync(path.join(__dirname,'cert','cert.pem'))
}

const sslserver = https.createServer(options,app)
var server = sslserver.listen(port, function () {
  console.log(`Express server listening on port ${port}`);
});
