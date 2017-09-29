var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '50mb', keepExtensions: true, uploadDir: 'uploads'}));

var routes2 = require('./api/routes/fileRoutes');
routes2(app);
var routes1 = require('./api/routes/userRoutes');
routes1(app);

var fs = require('fs');
var uploadsDir = './uploads';

if(!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

var port = 3010;
app.listen(port);
console.log('user RESTful API server started on: ' + port);