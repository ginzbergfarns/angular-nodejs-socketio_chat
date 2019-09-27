const socketio = require('socket.io');
const SocketRoutes = require('./socket-routes');

class Socket {
    constructor(server) {
        this.socket = socketio(server);
        this.init();
    }

    static getIo(cb) {
        if (Socket._io && Socket._io.connected){
            cb(Socket._io);
        } else {
            this.socket.on('connection', (socket) => {
                Socket._io = socket;
                cb(Socket._io);
            });
        }
        return Socket._io;
    }

    init() {
        this.socket.on('connection', (socket) => {
            Socket._io = socket;
            SocketRoutes.initEvents(socket, this.socket);
        });
    }


}

module.exports = Socket;