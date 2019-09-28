const uniqid = require('uniqid');

class Room {
    constructor(name) {
        this.name = name;
        this.id = uniqid();
        this.history = [];
    }

    addMessage(msg) {
        this.history.push(msg);
    }
}

module.exports = Room;
