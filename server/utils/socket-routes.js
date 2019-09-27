const authController = require('../controllers/auth.controller');
const roomController = require('../controllers/room.controller');
const chatController = require('../controllers/chat.controller');

class SocketRoutes {
    constructor() {
    }

    static initEvents(socket, io) {
        this.$createUser = authController.createUser.bind(this, socket);
        this.$roomJoin = roomController.joinRoom.bind(this, socket);
        this.$messageHandler = chatController.handlerMessage.bind(this, io);

        socket.on('createUser', this.$createUser);
        socket.on('userLeave', authController.logoutUser);
        socket.on('roomJoin', this.$roomJoin);
        socket.on('roomLeave', () => {});
        socket.on('message', this.$messageHandler);
    }
}

module.exports = SocketRoutes;