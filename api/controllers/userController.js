var fs = require("fs");
var userFilePath = __dirname + '/../constants/users.json';
exports.fetch_all_users = function(req, res) {
  let users = [];
  fs.readFile(userFilePath, 'utf8', function(err, users) {
    res.end(users);
  });
};

exports.create_user = function(req, res) {
  let user = {
    "user4": {
      "name": "mohit",
      "password": "password4",
      "profession": "teacher",
      "id": 4
    }
  }
  fs.readFile(userFilePath, 'utf8', function(err, users) {
    users = JSON.parse(users);
    users['user4'] = user['user4'];
    console.log(users);
    res.json(users);
  });
}

exports.fetch_user = function(req, res) {
  console.log(req.params.userId);
  fs.readFile(userFilePath, 'utf8', function(err, users) {
    var users = JSON.parse(users);
    var user = users["user" + req.params.userId]
    console.log(user);
    res.json((user));
  });
}

exports.update_user = function(req, res) {
  var response = req.body;
  console.log(response);
  res.json({success: true});
}

exports.delete_user = function(req, res) {
  var response = req.body;
  console.log(response);
  res.json({success: true});
}


