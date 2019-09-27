exports.handlerMessage = (socket, msg, roomId) => {
    console.log(msg, roomId);
    socket.in(roomId).emit('message', msg);
};