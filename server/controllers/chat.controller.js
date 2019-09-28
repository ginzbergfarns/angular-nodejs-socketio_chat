const DB = require('../utils/db');

exports.handlerMessage = (socket, message) => {
  const userList = DB.users;
  const targetUser = userList.filter(user => user.room.id === message.roomId);

  try {
    const msg = {
      text: message.text,
      userId: targetUser[0].id,
      roomId: message.roomId,
      fromRoomId: message.fromRoomId
    };

    targetUser[0].room.addMessage(msg);
    socket.in(message.roomId).emit('message', msg);
  } catch (e) {
    socket.in(message.roomId).emit('messageError', 'Target user was been deleted');
  }
};
