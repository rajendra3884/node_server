var fs = require("fs");
var util = require("util");
var formidable = require('formidable');
var path = require('path')

exports.upload_file = function(req, res) {

  console.log(req.body);

  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    //console.log('files');
    //console.log(files);
    //console.log(fields);
    res.writeHead(200, {'content-type': 'text/plain'});
    //res.write('received upload:\n\n');
    var parsedData = JSON.stringify(fields);
    res.end(util.inspect({fields: parsedData}));
  });
  form.on('error', function(err) {
    console.error(err);
  });
  form.on('progress', function(bytesReceived, bytesExpected) {
    var percent_complete = (bytesReceived / bytesExpected) * 100;
    //console.log(percent_complete.toFixed(2));
  });
  form.on('end', function(fields, files) {
    this.openedFiles.forEach(function(value) {
      xyz(value);
    });

  });
}

function xyz(value) {
  var temp_path = value.path;
  var file_name = value.name;
  var new_location = 'public/images/';
  var file_name_final = new_location + file_name;
  console.log(file_name_final);
  fs.readFile(temp_path, function(err, data) {
    fs.writeFile(file_name_final, data, function(err) {
      fs.unlink(temp_path, function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("success!");
        }
      });
    });
  });
}


var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(request, file, callback) {
    callback(null, '/uploads');
  },
  filename: function(request, file, callback) {
    console.log(file);
    callback(null, file.originalname)
  }
});

var upload = multer({storage: storage}).array('photo', 1);

exports.upload_files = function(request, response) {
  upload(request, response, function(err) {
    if(err) {
      console.log('Error Occured');
      console.log(err);
      response.end('Error Occured');
      return;
    }
    // request.files is an object where fieldname is the key and value is the array of files
    console.log(request.files);
    response.end('Your Files Uploaded');
    console.log('Photo Uploaded');
  })
}



