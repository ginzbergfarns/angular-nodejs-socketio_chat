class DB {
    constructor() {
    }

    static addUser(user) {
        DB.users.push(user);
    }

    static deleteUser(id) {
        const targetIndex = DB.users.findIndex(target => target.id === id);
        DB.users.splice(targetIndex, 1);
    }

}

module.exports = DB;