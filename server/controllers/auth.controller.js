const User = require('../models/user');

exports.createUser = (socket, data, callback) => {
  // User saved to DB inside User class
  const user = new User(data.name);
  socket.broadcast.emit('userCreate', user);
  callback(user);
};

exports.logoutUser = (id) => {
  User.deleteUser(id);
};
