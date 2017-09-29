'use strict';
var user = require('../controllers/fileController');
module.exports = function(app) {
  app.route('/api/files')
  .post(user.upload_file)
};