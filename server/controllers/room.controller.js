exports.joinRoom = (socket, roomId) => {
    socket.join(roomId);
    console.log(123);
};