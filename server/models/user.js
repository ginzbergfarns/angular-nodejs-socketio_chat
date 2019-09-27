const uniqid = require('uniqid');
const Room = require('./room');
const DB = require('../utils/db');

class User {
    constructor(name) {
        this.name = name;
        this.id = uniqid();
        this.room = new Room(this.name);
        this.init()
    }

    init() {
        DB.addUser(this);
    }

    static deleteUser(id) {
        DB.deleteUser(id);
    }
}

module.exports = User;