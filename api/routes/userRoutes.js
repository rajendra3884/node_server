'use strict';
var user = require('../controllers/userController');
module.exports = function(app) {
  // todoList Routes
  app.route('/api/users')
  .get(user.fetch_all_users)
  .post(user.create_user);

  app.route('/api/user/:userId')
  .get(user.fetch_user)
  .put(user.update_user)
  .delete(user.delete_user);
};